import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
}

export const ChatInterface: React.FC<Props> = ({ messages, onSendMessage, isProcessing }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full cyber-border bg-zinc-900/80 rounded-lg overflow-hidden">
      <div className="p-3 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Ghost // Assistant Link</span>
        <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-emerald-400 animate-ping' : 'bg-zinc-700'}`} />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]">
        {messages.length === 0 && (
          <div className="text-center text-zinc-600 text-xs mt-8 font-mono">
            System initialized. Awaiting constraints.<br/>
            Ex: "My lower back hurts" or "I only have dumbbells today"
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded px-3 py-2 text-sm font-mono ${
              msg.role === 'user' 
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700' 
                : 'bg-emerald-900/20 text-emerald-100 border border-emerald-500/20'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-800 bg-zinc-950">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Override protocols..."
            className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-emerald-500 font-mono"
          />
          <button 
            type="submit"
            disabled={isProcessing}
            className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold px-4 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            CMD
          </button>
        </div>
      </form>
    </div>
  );
};