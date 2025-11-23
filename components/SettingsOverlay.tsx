
import React from 'react';
import { UserProfile, ExperienceLevel, TrainingSplit } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
}

export const SettingsOverlay: React.FC<Props> = ({ isOpen, onClose, profile, onUpdate }) => {
  if (!isOpen) return null;

  const updateStats = (key: keyof typeof profile.stats, value: any) => {
    onUpdate({
      stats: { ...profile.stats, [key]: value }
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 bg-[#09090b]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Operator Profile</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500">CONFIGURATION_MODE</span>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <i className="ph-bold ph-x"></i>
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Section: Biometrics */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 font-mono">Biometrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="text-[10px] text-zinc-500 font-mono block mb-1">WEIGHT (LBS)</label>
                <input 
                  type="number" 
                  value={profile.stats.weight} 
                  onChange={(e) => updateStats('weight', parseInt(e.target.value))}
                  className="bg-transparent text-white font-bold text-xl w-full focus:outline-none font-mono"
                />
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="text-[10px] text-zinc-500 font-mono block mb-1">HEIGHT (IN)</label>
                <input 
                  type="number" 
                  value={profile.stats.height} 
                  onChange={(e) => updateStats('height', parseInt(e.target.value))}
                  className="bg-transparent text-white font-bold text-xl w-full focus:outline-none font-mono"
                />
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                <label className="text-[10px] text-zinc-500 font-mono block mb-1">AGE</label>
                <input 
                  type="number" 
                  value={profile.stats.age} 
                  onChange={(e) => updateStats('age', parseInt(e.target.value))}
                  className="bg-transparent text-white font-bold text-xl w-full focus:outline-none font-mono"
                />
              </div>
              <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center">
                <div className="flex gap-2 w-full">
                  {['Male', 'Female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => updateStats('gender', g)}
                      className={`flex-1 py-2 rounded text-xs font-bold uppercase transition-colors ${
                        profile.stats.gender === g 
                          ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                          : 'bg-white/5 text-zinc-500 hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Duration */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 font-mono">Target Duration</h3>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-white">{profile.target_duration} MIN</span>
                <span className="text-xs text-zinc-500 font-mono">
                  ~{Math.floor(profile.target_duration / 10)} Exercises
                </span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="120" 
                step="15" 
                value={profile.target_duration} 
                onChange={(e) => onUpdate({ target_duration: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[9px] font-mono text-zinc-600">
                <span>15m</span>
                <span>120m</span>
              </div>
            </div>
          </section>

          {/* Section: Experience */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 font-mono">Clearance Level</h3>
            <div className="grid grid-cols-3 gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => onUpdate({ experience: level as ExperienceLevel })}
                  className={`py-3 px-2 rounded-xl border text-xs font-bold uppercase transition-all ${
                    profile.experience === level
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                      : 'bg-black/40 border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 font-mono">
              *Informs initial load calculations and progressive overload aggressiveness.
            </p>
          </section>

          {/* Section: Split */}
          <section>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 font-mono">Training Protocol</h3>
            <div className="space-y-2">
              {['Full Body', 'Push/Pull/Legs', 'Upper/Lower'].map((split) => (
                <button
                  key={split}
                  onClick={() => onUpdate({ preferred_split: split as TrainingSplit })}
                  className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all ${
                    profile.preferred_split === split
                      ? 'bg-zinc-800 border-emerald-500/50'
                      : 'bg-black/20 border-white/5 hover:bg-black/40'
                  }`}
                >
                  <span className={`text-sm font-bold ${profile.preferred_split === split ? 'text-white' : 'text-zinc-400'}`}>
                    {split}
                  </span>
                  {profile.preferred_split === split && (
                    <i className="ph-fill ph-check-circle text-emerald-500 text-lg"></i>
                  )}
                </button>
              ))}
            </div>
          </section>

        </div>

        <div className="p-6 border-t border-white/5 bg-black/40">
          <button 
            onClick={onClose}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] font-mono text-sm"
          >
            SAVE CONFIGURATION
          </button>
        </div>

      </div>
    </div>
  );
};
