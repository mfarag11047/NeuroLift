
import React from 'react';
import { WorkoutItem } from '../types';

interface Props {
  workout: WorkoutItem[];
  phaseName?: string;
  onStart: () => void;
  onRegenerate: () => void;
}

export const WorkoutOverview: React.FC<Props> = ({ workout, phaseName = "MISSION BRIEF", onStart, onRegenerate }) => {
  if (workout.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 animate-in fade-in zoom-in duration-500">
        <div className="relative mb-8 group cursor-pointer" onClick={onRegenerate}>
          <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full group-hover:bg-emerald-500/30 transition-all"></div>
          <div className="w-24 h-24 rounded-full glass-panel flex items-center justify-center border border-emerald-500/30 relative z-10 group-hover:scale-105 transition-transform">
             <i className="ph-fill ph-lightning text-4xl text-emerald-400"></i>
          </div>
        </div>
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">SYSTEM IDLE</h2>
        <p className="text-zinc-500 mb-8 max-w-xs mx-auto text-sm font-mono">
          Biometrics calibrated. Awaiting generation protocol.
        </p>
        <button 
          onClick={onRegenerate}
          className="bg-zinc-100 hover:bg-white text-black font-bold px-8 py-3 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 flex items-center gap-2 font-mono text-sm tracking-wide"
        >
          <i className="ph-bold ph-play"></i>
          INITIALIZE_SEQUENCE
        </button>
      </div>
    );
  }

  const estimatedSets = workout.reduce((acc, curr) => acc + curr.sets, 0);

  return (
    <div className="pb-32 animate-in slide-in-from-bottom-8 duration-500">
      
      {/* HUD Header */}
      <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-widest font-mono">BRIEFING_READY</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase max-w-[250px] leading-[0.9]">
            {phaseName.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
        </div>
        <button onClick={onRegenerate} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all active:rotate-180">
          <i className="ph-bold ph-arrows-clockwise text-xl"></i>
        </button>
      </div>

      {/* Stats Row - Responsive */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'SETS', val: estimatedSets, icon: 'ph-stack' },
          { label: 'EXERCISES', val: workout.length, icon: 'ph-barbell' },
          { label: 'TIME', val: `${Math.round(estimatedSets * 3)}m`, icon: 'ph-clock' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-3 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold text-zinc-500 font-mono mb-1">{stat.label}</span>
            <span className="text-xl font-bold text-white tracking-tight">{stat.val}</span>
          </div>
        ))}
      </div>

      {/* Exercise List - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workout.map((item, idx) => (
          <div key={idx} className="glass-card p-0 rounded-xl overflow-hidden group flex flex-col">
            <div className="p-4 flex justify-between items-start flex-1">
              <div>
                <span className="text-[9px] font-bold font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-2 inline-block">
                  {item.slot_type.toUpperCase()}
                </span>
                <h3 className="font-bold text-white text-lg leading-tight">{item.exercise.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{item.exercise.displayMetadata.primaryMuscle}</p>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-zinc-200">{item.sets}</div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase">Sets</div>
              </div>
            </div>
            
            {/* Tech Specs Footer */}
            <div className="bg-white/5 px-4 py-2 flex justify-between items-center border-t border-white/5 mt-auto">
              <div className="flex gap-4">
                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-zinc-600">REPS:</span> {item.reps}
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  <span className="text-zinc-600">LOAD:</span> {item.load}
                </div>
              </div>
              <i className="ph-bold ph-caret-right text-zinc-600 group-hover:text-emerald-500 transition-colors"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-24 left-0 w-full px-6 z-30 pointer-events-none flex justify-center">
        <button 
          onClick={onStart}
          className="pointer-events-auto w-full max-w-md glass-panel bg-emerald-500/90 hover:bg-emerald-400 text-black font-black text-lg py-4 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md border-emerald-400/50 transition-all active:scale-[0.98] flex justify-between items-center px-6"
        >
          <span>EXECUTE_SESSION</span>
          <i className="ph-bold ph-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
