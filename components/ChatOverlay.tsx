import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
}

export const ChatOverlay: React.FC<Props> = ({ isOpen, onClose, messages, onSendMessage, isProcessing }) => {
  const [input, setInput] = React.useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-end justify-end sm:items-center sm:justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative w-full sm:max-w-md h-[85vh] sm:h-[600px] bg-[#09090b] sm:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 bg-black/40 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <i className="ph-bold ph-robot text-emerald-500"></i>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">TACTICAL AI</h3>
              <div className="flex items-center gap-1.5">
                <div className={`w-1 h-1 rounded-full ${isProcessing ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
                <span className="text-[10px] text-zinc-500 font-mono tracking-wide">
                  {isProcessing ? 'PROCESSING...' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-400">
            <i className="ph-bold ph-x"></i>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
               <i className="ph-duotone ph-waveform text-4xl text-zinc-500 mb-2"></i>
               <p className="text-zinc-500 text-xs font-mono max-w-[200px]">
                 Voice your constraints.
                 <br/>Example: "Right shoulder is sore"
               </p>
             </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-zinc-100 text-black rounded-2xl rounded-tr-sm shadow-lg' 
                  : 'glass-panel text-zinc-200 rounded-2xl rounded-tl-sm border border-white/5'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input parameters..."
              autoFocus
              className="flex-1 bg-zinc-900/50 border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500/50 transition-colors font-mono placeholder:text-zinc-600"
            />
            <button 
              type="submit"
              disabled={isProcessing || !input.trim()}
              className="bg-emerald-500 text-black w-12 rounded-xl flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <i className="ph-bold ph-paper-plane-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};