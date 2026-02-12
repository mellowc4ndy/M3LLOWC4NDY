import React from 'react';

interface DiaryDetailProps {
  entry: any;
  onBack: () => void;
}

const DiaryDetail: React.FC<DiaryDetailProps> = ({ entry, onBack }) => {
  return (
    <div className="min-h-screen animate-[fade_0.5s_ease-out] relative">
      <div className="max-w-3xl mx-auto pt-10">
        {/* Navigation */}
        <div className="mb-16 text-center">
           <button 
            onClick={onBack}
            className="mono text-[10px] text-[#c7ceea] hover:text-[#ffb7b2] uppercase tracking-widest transition-colors mb-4"
          >
            ↑ Return to Log
          </button>
          <div className="w-[1px] h-12 bg-[#c7ceea]/30 mx-auto"></div>
        </div>

        {/* Paper-like Content Area */}
        <div className="bg-white/40 backdrop-blur-sm p-8 md:p-16 rounded-sm shadow-sm border border-[#fff]">
          <div className="flex flex-col items-center mb-12">
            <span className="mono text-xs text-[#ffb7b2] tracking-wider mb-2">{entry.date}</span>
            <h2 className="serif text-4xl md:text-5xl text-[#4a4a6a] italic text-center">{entry.title}</h2>
            <div className="w-12 h-1 bg-[#e2f0cb] mt-6 rounded-full"></div>
          </div>

          <div className="font-serif text-lg md:text-xl text-[#4a4a6a]/80 leading-loose tracking-wide whitespace-pre-wrap text-justify">
            {entry.content}
          </div>
          
          <div className="mt-16 pt-8 border-t border-[#c7ceea]/20 flex justify-between items-end">
            <span className="serif italic text-[#c7ceea] text-2xl">Mellow.</span>
            <div className="mono text-[9px] text-[#4a4a6a]/30 uppercase">
              End of Entry // ID: {entry.id}
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-40 left-10 w-64 h-64 bg-[#ffb7b2] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 pointer-events-none"></div>
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DiaryDetail;