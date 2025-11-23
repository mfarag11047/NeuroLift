import React from 'react';
import { CompletedSession } from '../types';

interface Props {
  history: CompletedSession[];
}

export const LogbookView: React.FC<Props> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center mb-6 border border-white/5">
           <i className="ph-duotone ph-notebook text-3xl text-zinc-600"></i>
        </div>
        <h2 className="text-xl font-black text-white mb-2 tracking-tight uppercase">No Data Found</h2>
        <p className="text-zinc-500 text-sm font-mono max-w-xs mx-auto">
          Complete protocols to initialize the mission log.
        </p>
      </div>
    );
  }

  // Group by Date String (YYYY-MM-DD)
  const grouped = history.reduce((acc, session) => {
    const dateStr = new Date(session.date).toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(session);
    return acc;
  }, {} as Record<string, CompletedSession[]>);

  return (
    <div className="pb-32 animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mission Log</h1>
        <p className="text-zinc-400 text-xs font-mono">HISTORICAL PERFORMANCE DATA</p>
      </div>

      <div className="relative border-l-2 border-white/5 ml-3 space-y-12">
        {Object.entries(grouped).map(([dateStr, sessions]: [string, CompletedSession[]]) => (
          <div key={dateStr} className="relative pl-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] z-10"></div>
            
            {/* Date Header */}
            <div className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4 font-mono">
              {dateStr}
            </div>

            {/* Sessions for this day */}
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="glass-card p-0 rounded-xl overflow-hidden hover:border-emerald-500/30 transition-colors group">
                  
                  {/* Card Header */}
                  <div className="bg-white/5 p-3 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <i className="ph-fill ph-check-circle text-emerald-500"></i>
                      <span className="text-xs font-bold text-white uppercase">Completed Protocol</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>

                  {/* Exercise List */}
                  <div className="p-4 space-y-3">
                    {session.exercises.map((ex, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-white/5 last:border-0 pb-2 last:pb-0">
                        <div>
                          <div className="text-sm font-bold text-zinc-200">{ex.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                            {ex.sets} SETS × {ex.reps}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-mono font-bold text-emerald-400">
                            {ex.load.replace('Bodyweight', 'BW')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer Stats */}
                  <div className="bg-black/20 p-3 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>VOL: {Math.round(session.totalVolume).toLocaleString()} LBS</span>
                    <div className="flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                      <span>DETAILS</span>
                      <i className="ph-bold ph-arrow-right"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};