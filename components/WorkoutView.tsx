import React, { useState, useEffect } from 'react';
import { WorkoutItem } from '../types';

interface Props {
  workout: WorkoutItem[];
  onLoadChange?: (index: number, newLoad: string) => void;
}

// Helper component to manage the load input logic
const LoadInput: React.FC<{ 
  initialLoad: string; 
  onUpdate: (val: string) => void 
}> = ({ initialLoad, onUpdate }) => {
  const isBodyweight = initialLoad.toLowerCase().includes('bodyweight');
  
  // Extract number from string, default to 0 if none found
  const extractWeight = (str: string) => {
    const match = str.match(/(\d+(\.\d+)?)/);
    return match ? match[0] : '0';
  };

  const [weight, setWeight] = useState(extractWeight(initialLoad));

  // If the prompt generated "Bodyweight", we want the input to show 0 initially (for added weight)
  // If it generated "135 lbs", we want 135.
  useEffect(() => {
    if (isBodyweight && !initialLoad.match(/\d/)) {
      setWeight('0');
    } else {
      setWeight(extractWeight(initialLoad));
    }
  }, [initialLoad, isBodyweight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setWeight(val);
    
    // Format back to string for the parent state
    if (isBodyweight) {
      if (val === '0' || val === '') {
        onUpdate("Bodyweight");
      } else {
        onUpdate(`Bodyweight + ${val} lbs`);
      }
    } else {
      onUpdate(`${val} lbs`);
    }
  };

  if (isBodyweight) {
    return (
      <div className="flex items-center justify-end gap-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">BODYWEIGHT</span>
        <span className="text-zinc-600 font-mono">+</span>
        <div className="relative group">
           <input 
            type="number" 
            value={weight}
            onChange={handleChange}
            className="bg-transparent border-b border-zinc-700 hover:border-emerald-500 focus:border-emerald-500 text-lg font-mono text-emerald-400 font-bold text-right w-16 focus:outline-none transition-colors appearance-none"
          />
          <span className="text-xs text-zinc-600 font-mono ml-1">lbs</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <input 
        type="number" 
        value={weight}
        onChange={handleChange}
        className="bg-transparent border-b border-zinc-700 hover:border-emerald-500 focus:border-emerald-500 text-2xl font-mono text-emerald-400 font-bold text-right w-24 focus:outline-none transition-colors appearance-none"
      />
      <span className="text-sm text-zinc-500 font-mono font-bold mt-2">lbs</span>
    </div>
  );
};

export const WorkoutView: React.FC<Props> = ({ workout, onLoadChange }) => {
  if (workout.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-zinc-800 rounded-lg text-zinc-500 font-mono">
        <p>NO_DATA_STREAM</p>
        <p className="text-xs mt-2">Awaiting algorithmic generation...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workout.map((item, idx) => (
        <div key={idx} className="cyber-border bg-zinc-900 p-4 rounded relative overflow-hidden group transition-all hover:border-emerald-500/50">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
          
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-900/20">
                {item.slot_type}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{item.exercise.name}</h3>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="text-2xl font-mono text-white font-bold">{item.sets} x {item.reps}</div>
              
              <div className="mt-1">
                <LoadInput 
                  initialLoad={item.load} 
                  onUpdate={(newVal) => onLoadChange && onLoadChange(idx, newVal)}
                />
              </div>

              <div className="text-xs text-zinc-400 font-mono mt-2">Rest: {item.rest}</div>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-xs text-zinc-500 max-w-[70%]">
              <span className="text-zinc-600 font-bold">TARGET: </span>{item.exercise.displayMetadata.primaryMuscle}
            </div>
            <div className="text-[10px] font-mono text-emerald-400/70 text-right max-w-[50%]">
              &gt; {item.rationale}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};