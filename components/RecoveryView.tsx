import React from 'react';

interface Props {
  fatigueState: Record<string, number>;
  onSimulateRest: (hours: number) => void;
  systemicFatigue: number;
}

export const RecoveryView: React.FC<Props> = ({ fatigueState, onSimulateRest, systemicFatigue }) => {
  
  // Granular muscle mapping for detailed view
  const muscleGroups = [
    { label: "Pectorals", keys: ["Pectoralis Major", "Chest"] },
    { label: "Lats", keys: ["Latissimus Dorsi"] },
    { label: "Traps / Upper Back", keys: ["Trapezius", "Rhomboids", "Upper Back"] },
    { label: "Spinal Erectors", keys: ["Erector Spinae", "Lower Back"] },
    { label: "Quadriceps", keys: ["Quadriceps"] },
    { label: "Hamstrings", keys: ["Hamstrings"] },
    { label: "Glutes", keys: ["Glutes", "Gluteus Maximus"] },
    { label: "Calves", keys: ["Calves", "Gastrocnemius", "Soleus"] },
    { label: "Biceps", keys: ["Biceps Brachii", "Biceps"] },
    { label: "Triceps", keys: ["Triceps Brachii", "Triceps"] },
    { label: "Deltoids", keys: ["Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid", "Shoulders"] },
    { label: "Core", keys: ["Core", "Rectus Abdominis", "Obliques"] },
  ];

  // Helper to calculate average fatigue for a group of related muscles
  const getGroupFatigue = (keys: string[]) => {
    let totalFatigue = 0;
    let count = 0;
    
    keys.forEach(k => {
      // Check if we have data for this specific key
      if (fatigueState[k] !== undefined) {
        totalFatigue += fatigueState[k];
        count++;
      }
    });

    // If no specific keys found, check if the label itself acts as a key or default to fresh
    if (count === 0) return 0.1; 
    
    return totalFatigue / count;
  };

  const getBarColor = (freshness: number) => {
    if (freshness > 0.8) return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
    if (freshness > 0.5) return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
    return 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]';
  };

  return (
    <div className="pb-32 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white mb-2">Biometric Status</h1>
      <p className="text-zinc-400 text-sm mb-8 font-mono">SYSTEM DIAGNOSTICS // MUSCLE RECOVERY</p>

      {/* Systemic Status Card */}
      <div className="glass-panel p-6 rounded-3xl mb-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <i className="ph-fill ph-heartbeat text-9xl text-white"></i>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-end mb-2">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">CNS Capacity</div>
            <div className="text-4xl font-black text-white tracking-tighter">
              {Math.round((1 - (systemicFatigue / 5)) * 100)}<span className="text-lg text-zinc-500">%</span>
            </div>
          </div>
          
          <div className="w-full bg-black/40 h-4 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-rose-600 via-yellow-500 to-emerald-500 transition-all duration-1000 relative"
                style={{ width: `${(1 - (systemicFatigue / 5)) * 100}%` }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
              </div>
          </div>
          
          <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-600 font-bold">
            <span>CRITICAL</span>
            <span>OPTIMAL</span>
          </div>
        </div>
      </div>

      {/* Detailed Muscle Grid */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
           <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Muscular System</span>
           <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-[10px] font-mono text-emerald-500">LIVE_DATA</span>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          {muscleGroups.map((group) => {
            const fatigue = getGroupFatigue(group.keys);
            const freshness = Math.max(0, 1 - fatigue);
            const percentage = Math.round(freshness * 100);
            
            return (
              <div key={group.label} className="group">
                <div className="flex justify-between mb-1.5 items-end">
                  <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">{group.label}</span>
                  <span className={`text-xs font-mono font-bold ${percentage < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-zinc-900/80 h-2 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${getBarColor(freshness)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button 
          onClick={() => onSimulateRest(12)}
          className="glass-panel bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-bold py-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
        >
          <i className="ph-bold ph-moon-stars text-xl mb-1"></i>
          <span className="text-xs">SLEEP (12H)</span>
        </button>
        <button 
          onClick={() => onSimulateRest(24)}
          className="glass-panel bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-400 font-bold py-4 rounded-2xl border border-emerald-500/20 flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
        >
          <i className="ph-bold ph-coffee text-xl mb-1"></i>
          <span className="text-xs">RECOVER (24H)</span>
        </button>
      </div>
    </div>
  );
};