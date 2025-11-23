import React from 'react';

interface Props {
  fatigueState: Record<string, number>;
}

export const MuscleHeatmap: React.FC<Props> = ({ fatigueState }) => {
  // Simple grid visualization of main muscle groups
  const mainMuscles = [
    "Quadriceps", "Hamstrings", "Glutes", "Erector Spinae", 
    "Latissimus Dorsi", "Trapezius", "Pectoralis Major", 
    "Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid",
    "Biceps Brachii", "Triceps Brachii", "Core"
  ];

  const getColor = (muscle: string) => {
    const fatigue = fatigueState[muscle] || 0.1; // Default low fatigue
    // Interpolate Green (fresh) to Red (tired)
    // 0.0 -> Green, 1.0 -> Red
    if (fatigue < 0.3) return 'bg-emerald-500';
    if (fatigue < 0.6) return 'bg-yellow-500';
    return 'bg-rose-600';
  };

  return (
    <div className="p-4 border border-zinc-800 bg-zinc-900/50 rounded-lg">
      <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3 tracking-widest">Biometric Status // Muscle Freshness</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {mainMuscles.map(muscle => {
          const fatigue = fatigueState[muscle] || 0.0;
          const freshness = Math.round((1 - fatigue) * 100);
          return (
            <div key={muscle} className="flex items-center justify-between p-2 bg-zinc-950 border border-zinc-800 rounded text-xs">
              <span className="text-zinc-300">{muscle}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-500">{freshness}%</span>
                <div className={`w-2 h-2 rounded-full ${getColor(muscle)} animate-pulse`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};