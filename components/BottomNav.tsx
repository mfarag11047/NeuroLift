import React from 'react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<Props> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'workout', icon: 'ph-barbell', label: 'WORKOUT' },
    { id: 'logbook', icon: 'ph-notebook', label: 'LOGS' },
    { id: 'recovery', icon: 'ph-activity', label: 'STATUS' },
  ];

  return (
    <div className="fixed bottom-6 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div className="flex items-center gap-1 p-1.5 rounded-full glass-panel shadow-2xl pointer-events-auto bg-black/40">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center w-20 h-12 rounded-full transition-all duration-300 overflow-hidden group ${
                isActive ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {/* Active Background Pill */}
              {isActive && (
                <div className="absolute inset-0 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] animate-in zoom-in duration-300" />
              )}
              
              <div className="relative z-10 flex flex-col items-center gap-0.5">
                <i className={`text-xl ph-bold ${tab.icon} ${isActive ? 'scale-110' : ''} transition-transform`}></i>
                {isActive && (
                   <span className="text-[9px] font-black tracking-tighter leading-none">{tab.label}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};