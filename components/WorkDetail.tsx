import React from 'react';
import type { ArchiveItem } from '../types';

interface WorkDetailProps {
  item: ArchiveItem;
  onBack: () => void;
}

const WorkDetail: React.FC<WorkDetailProps> = ({ item, onBack }) => {
  return (
    <div className="min-h-screen animate-[fade_0.5s_ease-out] pb-32">
      {/* Navigation / Header */}
      <div className="flex items-center justify-between mb-8 border-b border-[#c7ceea]/30 pb-6 sticky top-0 bg-[#fdfbf7]/80 backdrop-blur-sm z-40 pt-4">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 mono text-[10px] text-[#4a4a6a]/60 hover:text-[#ffb7b2] uppercase tracking-widest transition-colors"
        >
          <span>←</span>
          <span>Back to Archive</span>
        </button>
        <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#ffb7b2] animate-pulse"></span>
            <span className="mono text-[10px] text-[#c7ceea] tracking-wider">{item.code}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        
        {/* Cinematic Hero Image */}
        <div className="w-full max-w-5xl mx-auto mb-16 relative group">
           <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-sm shadow-xl">
             <img 
               src={item.imageUrl} 
               alt={item.title} 
               className="w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-[#4a4a6a]/10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700"></div>
           </div>
           {/* Decorative corner lines */}
           <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#c7ceea]"></div>
           <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#ffb7b2]"></div>
        </div>

        {/* Editorial Header */}
        <div className="max-w-3xl w-full text-center mb-12">
            <span className="mono text-xs text-[#ffb7b2] tracking-[0.2em] uppercase mb-4 block">
                {item.category}
            </span>
            <h1 className="serif text-5xl md:text-7xl text-[#4a4a6a] italic leading-none mb-8">
                {item.title}
            </h1>
            
            {/* Metadata Grid */}
            <div className="flex justify-center items-center gap-8 md:gap-16 border-y border-[#c7ceea]/30 py-4 mb-8">
                <div className="flex flex-col gap-1">
                    <span className="mono text-[9px] text-[#c7ceea] uppercase">Date Logged</span>
                    <span className="serif text-sm text-[#4a4a6a]">{item.date}</span>
                </div>
                <div className="w-[1px] h-8 bg-[#c7ceea]/30 rotate-12"></div>
                <div className="flex flex-col gap-1">
                    <span className="mono text-[9px] text-[#c7ceea] uppercase">Ref Code</span>
                    <span className="serif text-sm text-[#4a4a6a]">{item.code}</span>
                </div>
                <div className="w-[1px] h-8 bg-[#c7ceea]/30 rotate-12"></div>
                <div className="flex flex-col gap-1">
                    <span className="mono text-[9px] text-[#c7ceea] uppercase">Author</span>
                    <span className="serif text-sm text-[#4a4a6a]">MellowCandy</span>
                </div>
            </div>
        </div>

        {/* Main Content Body */}
        <div className="max-w-3xl w-full px-4 md:px-0">
           <div className="prose prose-lg md:prose-xl prose-p:text-[#4a4a6a]/80 prose-p:font-serif prose-p:leading-loose prose-headings:font-serif prose-headings:italic prose-headings:text-[#4a4a6a] max-w-none text-justify">
             {/* Drop Cap Removed */}
             <p>
               {item.description}
             </p>
             <p>
               The boundaries of this space are defined not by walls, but by the cessation of light. Every object recovered from this sector vibrates with a low-frequency hum, suggesting a history of digital displacement. 
             </p>
             <p>
               Observers have noted that spending too much time analyzing {item.title} results in a temporary distortion of time perception. We recommend viewing this archive in short intervals to maintain coherence.
             </p>
             <blockquote>
               "Whatever was left here was left on purpose. A breadcrumb trail leading back to a home that no longer exists."
             </blockquote>
             <p>
               Further analysis is required to understand the full implications of this artifact. For now, it remains a static memory in the ever-shifting landscape of the Dreamscape.
             </p>
           </div>

           {/* Footer Actions */}
           <div className="mt-20 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-[#c7ceea]/30 pt-10">
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-8 py-3 bg-[#4a4a6a] text-white mono text-xs hover:bg-[#ffb7b2] transition-colors uppercase tracking-wider">
                  Download Asset
                </button>
                <button className="flex-1 md:flex-none px-8 py-3 border border-[#c7ceea] text-[#4a4a6a] mono text-xs hover:bg-white hover:border-[#ffb7b2] transition-colors uppercase tracking-wider">
                  Share
                </button>
              </div>
              <div className="mono text-[10px] text-[#c7ceea]">
                END OF RECORD // {item.id}
              </div>
           </div>
        </div>

      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default WorkDetail;
