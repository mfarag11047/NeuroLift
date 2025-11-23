import React, { useState, useEffect } from 'react';
import { WorkoutItem } from '../types';

interface Props {
  workout: WorkoutItem[];
  onLoadChange: (index: number, newLoad: string) => void;
  onComplete: () => void;
}

// Digital Input Component
const HUDInput: React.FC<{ initialLoad: string; onUpdate: (val: string) => void }> = ({ initialLoad, onUpdate }) => {
  const isBodyweight = initialLoad.toLowerCase().includes('bodyweight');
  const extractWeight = (str: string) => {
    const match = str.match(/(\d+(\.\d+)?)/);
    return match ? match[0] : '0';
  };
  const [weight, setWeight] = React.useState(extractWeight(initialLoad));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWeight(val);
    if (isBodyweight) {
      if (val === '0' || val === '') onUpdate("Bodyweight");
      else onUpdate(`Bodyweight + ${val} lbs`);
    } else {
      onUpdate(`${val} lbs`);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-emerald-500/10 blur-sm rounded opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
      <div className="flex items-center bg-black/40 border border-white/10 rounded px-2 py-1 relative z-10">
        <input 
          type="number" 
          value={weight}
          onChange={handleChange}
          className="bg-transparent text-right w-12 font-mono font-bold text-white text-lg focus:outline-none"
        />
        <span className="text-[10px] text-zinc-500 ml-1 font-bold font-mono">LBS</span>
      </div>
    </div>
  );
};

export const ActiveWorkoutSession: React.FC<Props> = ({ workout, onLoadChange, onComplete }) => {
  // Global Session Timer
  const [seconds, setSeconds] = React.useState(0);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Set Tracking
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());
  
  // Rest Timer Logic
  const [restTimer, setRestTimer] = useState<{ active: boolean, timeLeft: number, currentSetId: string | null }>({
    active: false,
    timeLeft: 0,
    currentSetId: null
  });

  useEffect(() => {
    let interval: any;
    if (restTimer.active && restTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (restTimer.timeLeft === 0 && restTimer.active) {
      setRestTimer(prev => ({ ...prev, active: false, currentSetId: null }));
      // Audio cue could go here
    }
    return () => clearInterval(interval);
  }, [restTimer.active, restTimer.timeLeft]);

  const parseRestTime = (restStr: string): number => {
    if (restStr.includes('min')) {
      return parseInt(restStr) * 60;
    }
    if (restStr.includes('s')) {
      return parseInt(restStr);
    }
    return 60; // default
  };

  const handleToggleSet = (exerciseIdx: number, setIdx: number, restTime: string) => {
    const setId = `${exerciseIdx}-${setIdx}`;
    const newCompleted = new Set(completedSets);
    
    if (newCompleted.has(setId)) {
      newCompleted.delete(setId);
      // If we uncheck, maybe cancel timer if it was for this set
      if (restTimer.currentSetId === setId) {
        setRestTimer({ active: false, timeLeft: 0, currentSetId: null });
      }
    } else {
      newCompleted.add(setId);
      // Start Rest Timer
      const seconds = parseRestTime(restTime);
      setRestTimer({
        active: true,
        timeLeft: seconds,
        currentSetId: setId
      });
    }
    setCompletedSets(newCompleted);
  };

  const handleMarkAll = () => {
    const allSets = new Set<string>();
    workout.forEach((item, exIdx) => {
      for(let i=0; i < item.sets; i++) {
        allSets.add(`${exIdx}-${i}`);
      }
    });
    setCompletedSets(allSets);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pb-32 animate-in slide-in-from-right duration-500">
      
      {/* Top Bar HUD */}
      <div className="glass-panel border-x-0 border-t-0 border-b border-white/10 p-4 -mx-6 -mt-6 mb-6 flex justify-between items-center sticky top-0 z-20 backdrop-blur-xl bg-black/60">
        <div>
          <h2 className="text-sm font-black text-white tracking-widest uppercase">Active Protocol</h2>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] text-emerald-500 font-mono">LIVE_TRACKING</span>
          </div>
        </div>
        <div className="font-mono text-xl font-bold text-white tracking-tight">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Sets Container - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workout.map((item, idx) => (
          <div key={idx} className="glass-card p-4 rounded-xl relative flex flex-col h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-white text-lg">{item.exercise.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded">
                    {item.slot_type.toUpperCase()}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">{item.sets} SETS TARGET</span>
                </div>
              </div>
            </div>

            {/* Set Rows */}
            <div className="space-y-2 flex-1">
              {Array.from({ length: item.sets }).map((_, setIdx) => {
                const setId = `${idx}-${setIdx}`;
                const isComplete = completedSets.has(setId);
                const isResting = restTimer.active && restTimer.currentSetId === setId;

                return (
                  <div key={setIdx}>
                    <div className={`flex items-center gap-3 py-1 transition-opacity ${isComplete ? 'opacity-50' : 'opacity-100'}`}>
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono border transition-colors ${
                        isComplete ? 'bg-emerald-500 text-black border-emerald-500' : 'bg-white/5 text-zinc-500 border-white/5'
                      }`}>
                        {setIdx + 1}
                      </div>
                      
                      {/* Digital Readouts */}
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <div className="flex items-center justify-between bg-black/40 border border-white/10 rounded px-3 py-2">
                           <span className="text-white font-mono font-bold">{item.reps}</span>
                           <span className="text-[9px] text-zinc-600 font-bold">REPS</span>
                        </div>
                        {setIdx === 0 ? (
                          <HUDInput initialLoad={item.load} onUpdate={(val) => onLoadChange(idx, val)} />
                        ) : (
                          <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded px-3 py-2 opacity-60">
                             <span className="text-zinc-400 font-mono font-bold text-sm">
                               {item.load.replace(' lbs', '').replace('Bodyweight', 'BW')}
                             </span>
                             <span className="text-[9px] text-zinc-700 font-bold">LBS</span>
                          </div>
                        )}
                      </div>

                      {/* Checkbox */}
                      <button 
                        onClick={() => handleToggleSet(idx, setIdx, item.rest)}
                        className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center ${
                          isComplete 
                            ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500 hover:text-black'
                        }`}
                      >
                        <i className={`ph-bold ${isComplete ? 'ph-check' : 'ph-check'}`}></i>
                      </button>
                    </div>

                    {/* Inline Rest Timer */}
                    {isResting && (
                      <div className="mt-2 mb-1 bg-zinc-900/80 border border-emerald-500/30 rounded-lg p-2 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                          <i className="ph-bold ph-timer animate-spin-slow"></i> RESTING
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {formatTime(restTimer.timeLeft)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Footer */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-30 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-md flex gap-3">
          <button 
            onClick={handleMarkAll}
            className="flex-1 glass-panel bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 font-bold text-xs py-4 rounded-xl border-zinc-700 transition-all active:scale-[0.98] uppercase tracking-wider"
          >
            Mark All
          </button>
          <button 
            onClick={onComplete}
            className="flex-[2] glass-panel bg-zinc-100 hover:bg-white text-black font-black text-lg py-4 rounded-xl shadow-xl transition-all active:scale-[0.98] border-zinc-200 flex items-center justify-center gap-2"
          >
            <span>COMPLETE</span>
            <i className="ph-bold ph-check-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};