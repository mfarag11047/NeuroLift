
import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutItem, ChatMessage, CompletedSession } from './types';
import { EXERCISE_DATABASE } from './data';
import { AlgorithmEngine } from './services/algorithmEngine';
import { GeminiService } from './services/geminiService';
import { BottomNav } from './components/BottomNav';
import { WorkoutOverview } from './components/WorkoutOverview';
import { ActiveWorkoutSession } from './components/ActiveWorkoutSession';
import { RecoveryView } from './components/RecoveryView';
import { LogbookView } from './components/LogbookView';
import { ChatOverlay } from './components/ChatOverlay';
import { SettingsOverlay } from './components/SettingsOverlay';

const getAllAvailableEquipment = (): string[] => {
  const equipmentSet = new Set<string>();
  EXERCISE_DATABASE.forEach(ex => {
    if (ex.equipment) {
      ex.equipment.split(',').forEach(item => equipmentSet.add(item.trim()));
    }
  });
  return Array.from(equipmentSet).sort();
};

const INITIAL_PROFILE: UserProfile = {
  id: "user_01",
  stats: {
    weight: 175,
    height: 70,
    age: 30,
    gender: 'Male'
  },
  experience: 'Intermediate',
  preferred_split: 'Push/Pull/Legs',
  split_index: 0, // Day 1
  target_duration: 60, // Minutes
  
  fatigue_state: {
    "Quadriceps": 0.1, "Hamstrings": 0.1, "Glutes": 0.1, "Erector Spinae": 0.2,
    "Latissimus Dorsi": 0.1, "Pectoralis Major": 0.1, "Anterior Deltoid": 0.1,
    "Biceps Brachii": 0.1, "Triceps Brachii": 0.1, "Core": 0.2
  },
  systemic_capacity: 3.0,
  current_systemic_fatigue: 1.0,
  available_equipment: getAllAvailableEquipment(),
  injuries: [],
  exercise_bias: {},
  exercise_history: {},
  completed_sessions: []
};

export default function App() {
  const [algoEngine] = useState(() => new AlgorithmEngine());
  const [geminiService] = useState(() => new GeminiService());

  const [activeTab, setActiveTab] = useState('workout'); 
  const [workoutMode, setWorkoutMode] = useState<'overview' | 'active'>('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [workout, setWorkout] = useState<WorkoutItem[]>([]);
  const [phaseName, setPhaseName] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  // Core Generator
  const handleGenerateWorkout = () => {
    const plan = algoEngine.generateWorkout(profile, EXERCISE_DATABASE);
    const currentPhase = algoEngine.getCurrentPhaseName(profile);
    
    setWorkout(plan);
    setPhaseName(currentPhase);
    setWorkoutMode('overview');
  };

  const handleStartWorkout = () => {
    setWorkoutMode('active');
  };

  const handleCompleteWorkout = () => {
    if (workout.length === 0) return;
    
    // 1. Update Stats (Fatigue + History)
    let newProfile = algoEngine.applyWorkoutEffects(profile, workout);

    // 2. Log Session
    const totalVol = workout.reduce((acc, item) => {
       const weight = parseFloat(item.load.match(/(\d+(\.\d+)?)/)?.[0] || '0');
       return acc + (weight * item.sets * 10);
    }, 0);

    const sessionLog: CompletedSession = {
      id: crypto.randomUUID(),
      date: Date.now(),
      totalVolume: totalVol,
      exercises: workout.map(item => ({
        name: item.exercise.name,
        sets: item.sets,
        reps: item.reps,
        load: item.load
      }))
    };

    // 3. Rotate Split (Day 1 -> Day 2 -> Day 3 -> Day 1)
    const splitMap = {
      'Full Body': 1,
      'Upper/Lower': 2,
      'Push/Pull/Legs': 3,
      'Bro Split': 5
    };
    const cycleLength = splitMap[newProfile.preferred_split] || 1;
    newProfile.split_index = (newProfile.split_index + 1) % cycleLength;

    // 4. Save
    newProfile = {
      ...newProfile,
      completed_sessions: [sessionLog, ...newProfile.completed_sessions]
    };

    setProfile(newProfile);
    setWorkout([]); 
    setWorkoutMode('overview'); 
    setActiveTab('recovery'); 
  };

  const handleRest = (hours: number) => {
    const newProfile = algoEngine.recover(profile, hours);
    setProfile(newProfile);
  };

  const handleLoadChange = (index: number, newLoad: string) => {
    const updatedWorkout = [...workout];
    updatedWorkout[index] = { ...updatedWorkout[index], load: newLoad };
    setWorkout(updatedWorkout);
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    // We wrap this because we need to trigger regen if experience/split changes
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: Date.now() };
    setChatMessages(prev => [...prev, userMsg]);
    setIsAiProcessing(true);

    const intent = await geminiService.processUserIntent(text, profile);

    setProfile(prev => {
      const newProfile = { ...prev };
      if (intent.injuries_to_add) newProfile.injuries = [...new Set([...prev.injuries, ...intent.injuries_to_add])];
      if (intent.injuries_to_remove) newProfile.injuries = prev.injuries.filter(i => !intent.injuries_to_remove.includes(i));
      if (intent.fatigue_modifications) newProfile.fatigue_state = { ...prev.fatigue_state, ...intent.fatigue_modifications };
      if (intent.equipment_update) newProfile.available_equipment = intent.equipment_update;
      if (intent.systemic_fatigue_delta) newProfile.current_systemic_fatigue = Math.max(0, Math.min(5, prev.current_systemic_fatigue + intent.systemic_fatigue_delta));
      return newProfile;
    });

    const aiMsg: ChatMessage = { role: 'assistant', content: intent.assistant_response || "Directives updated.", timestamp: Date.now() };
    setChatMessages(prev => [...prev, aiMsg]);
    setIsAiProcessing(false);
  };

  // Initial Load
  useEffect(() => {
    handleGenerateWorkout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-generate when profile structural parameters change (Split, Experience, Duration, AI Updates)
  useEffect(() => {
    if (workout.length === 0 || isChatOpen === false) {
        // We only auto-regen if we aren't in the middle of a workout
        // or if the chat just closed (AI intervention)
        // or if settings changed
        handleGenerateWorkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.experience, profile.preferred_split, profile.target_duration, profile.injuries, profile.split_index]);

  return (
    <div className="bg-tactical text-zinc-200 font-sans selection:bg-emerald-500/30 overflow-hidden relative">
      <div className="noise-overlay"></div>
      
      <main className="w-full max-w-5xl mx-auto min-h-screen p-6 relative z-10 pb-24">
        
        {workoutMode !== 'active' && (
          <header className="flex justify-between items-center mb-8 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                 <i className="ph-fill ph-barbell text-black text-xl"></i>
              </div>
              <div>
                <div className="text-[9px] font-black tracking-[0.2em] text-emerald-500 font-mono mb-0.5">NEUROLIFT // OS</div>
                <div className="text-lg font-bold text-white tracking-tight leading-none">Command Center</div>
              </div>
            </div>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/5 transition-colors"
            >
               <i className="ph-bold ph-gear text-zinc-400"></i>
            </button>
          </header>
        )}

        <div className="animate-in fade-in zoom-in-95 duration-300">
          {activeTab === 'workout' && (
            workoutMode === 'overview' 
              ? <WorkoutOverview workout={workout} phaseName={phaseName} onStart={handleStartWorkout} onRegenerate={handleGenerateWorkout} />
              : <ActiveWorkoutSession workout={workout} onLoadChange={handleLoadChange} onComplete={handleCompleteWorkout} />
          )}

          {activeTab === 'recovery' && (
            <RecoveryView 
              fatigueState={profile.fatigue_state} 
              systemicFatigue={profile.current_systemic_fatigue}
              onSimulateRest={handleRest}
            />
          )}

          {activeTab === 'logbook' && (
            <LogbookView history={profile.completed_sessions} />
          )}
        </div>

      </main>

      <div className="fixed bottom-24 right-5 z-40">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 bg-zinc-100 hover:bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95 border border-white/20"
        >
          <i className="ph-fill ph-chat-circle-text text-2xl"></i>
        </button>
      </div>

      <ChatOverlay 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isProcessing={isAiProcessing}
      />

      <SettingsOverlay
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onUpdate={handleUpdateProfile}
      />

      <BottomNav currentTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
