import React, { useState, useEffect } from 'react';

const DEFAULT_MESSAGES = [
    { id: 1, name: 'Traveler', text: 'This place feels familiar, like a memory I lost.', date: '2 hours ago' },
    { id: 2, name: 'Alice', text: 'The colors are so soft. I want to stay here.', date: 'Yesterday' },
    { id: 3, name: 'Ghost_01', text: 'Is this real?', date: '2 days ago' },
    { id: 4, name: 'System', text: 'Recording signal...', date: '3 days ago' }
];

interface GuestbookSectionProps {
  isAdmin?: boolean;
}

const GuestbookSection: React.FC<GuestbookSectionProps> = ({ isAdmin }) => {
  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem('mellow_guestbook');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('mellow_guestbook', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { 
        id: Date.now(), 
        name: isAdmin ? 'Admin' : 'Visitor', 
        text: input, 
        date: new Date().toLocaleDateString() 
    };
    setMessages([newMsg, ...messages]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    if(window.confirm("Remove this signal?")) {
        setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen py-32 px-4 md:px-12 bg-[#fdfbf7] relative animate-[fade_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-[#c7ceea]/30 pb-6">
           <h2 className="serif text-5xl md:text-7xl text-[#4a4a6a] tracking-tight">
             Guestbook<span className="text-[#ffb7b2]">.</span>
           </h2>
           <p className="mono text-[10px] uppercase tracking-widest mt-4 md:mt-0 text-[#4a4a6a]/50">
             // Leave a Trace
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left Column: Input Form & Context */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[400px]">
                <div className="space-y-8">
                    <p className="serif text-2xl md:text-3xl text-[#4a4a6a] italic leading-snug">
                        "Whisper to the void.<br/>It listens."
                    </p>
                    <p className="font-sans text-sm text-[#4a4a6a]/60 max-w-md leading-relaxed">
                        Leave a message for future travelers. Your signal will be stored in the local memory of this dreamscape.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative group mt-12 lg:mt-0">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isAdmin ? "Type admin broadcast..." : "Type a message..."}
                            className={`w-full bg-transparent border-b-2 py-6 pr-12 font-serif italic text-xl md:text-2xl focus:outline-none transition-colors placeholder:text-[#c7ceea]/50 ${isAdmin ? 'text-red-400 border-red-200 focus:border-red-400' : 'text-[#4a4a6a] border-[#c7ceea] focus:border-[#ffb7b2]'}`}
                        />
                        <button 
                            type="submit" 
                            className="absolute right-0 bottom-6 mono text-[10px] text-[#4a4a6a]/40 hover:text-[#ffb7b2] uppercase tracking-widest transition-colors interactive"
                        >
                            TRANSMIT ↵
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Column: Message Feed */}
            <div className="lg:col-span-7">
                <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    {messages.map(msg => (
                        <div key={msg.id} className="group p-6 md:p-8 bg-white/40 hover:bg-white/80 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#c7ceea]/30 relative">
                            {isAdmin && (
                                <button 
                                    onClick={() => handleDelete(msg.id)}
                                    className="absolute top-4 right-4 mono text-[8px] text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                >
                                    [DELETE]
                                </button>
                            )}
                            <p className="serif text-lg md:text-xl text-[#4a4a6a] leading-relaxed mb-4">"{msg.text}"</p>
                            <div className="flex items-center justify-between border-t border-[#c7ceea]/20 pt-4">
                                <div className="flex items-center gap-2 mono text-[9px] text-[#4a4a6a]/60 uppercase tracking-wider">
                                    <span className={`w-1.5 h-1.5 rounded-full ${msg.name === 'Admin' ? 'bg-red-400' : 'bg-[#ffb7b2]'}`}></span>
                                    <span>{msg.name}</span>
                                </div>
                                <span className="mono text-[9px] text-[#c7ceea]">{msg.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c7ceea; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default GuestbookSection;