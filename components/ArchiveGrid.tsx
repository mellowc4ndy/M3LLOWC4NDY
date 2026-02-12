import React from 'react';
import { ArchiveItem } from '../types';

interface ArchiveGridProps {
  items: ArchiveItem[];
  isAdmin?: boolean;
  onEdit?: (item: ArchiveItem) => void;
  onDelete?: (id: string) => void;
  onItemClick?: (id: string) => void;
}

const ArchiveGrid: React.FC<ArchiveGridProps> = ({ items, isAdmin, onEdit, onDelete, onItemClick }) => {
  return (
    <div className="flex flex-col gap-8 md:gap-0 border-t border-[#c7ceea]/30">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          onClick={() => onItemClick && onItemClick(item.id)}
          className="group relative md:border-b border-[#c7ceea]/30 transition-all duration-700 hover:bg-white/40 interactive rounded-2xl md:rounded-none cursor-pointer"
        >
          {/* Admin Controls Overlay */}
          {isAdmin && (
             <div className="absolute top-2 right-2 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-2 rounded-lg backdrop-blur-sm">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit && onEdit(item); }}
                  className="mono text-[10px] text-[#c7ceea] hover:text-[#4a4a6a] uppercase border border-[#c7ceea] px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete && onDelete(item.id); }}
                  className="mono text-[10px] text-red-300 hover:text-red-500 uppercase border border-red-200 px-2 py-1 rounded"
                >
                  Delete
                </button>
             </div>
          )}

          <div className="w-full p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
            
            {/* Index & Code */}
            <div className="flex md:flex-col items-baseline md:w-24 shrink-0">
               <span className="mono text-xs text-[#ffb7b2] mb-1">{(index + 1).toString().padStart(2, '0')}</span>
               <span className="mono text-[10px] opacity-40 tracking-wider group-hover:text-[#4a4a6a]">{item.code}</span>
            </div>

            {/* Title & Cat */}
            <div className="flex-grow">
               <div className="flex items-center gap-3 mb-1">
                 <h3 className="serif text-3xl md:text-5xl italic font-normal text-[#4a4a6a] group-hover:translate-x-4 transition-transform duration-500 ease-out">
                   {item.title}
                 </h3>
                 <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ffb7b2] text-xl">
                   ✦
                 </span>
               </div>
               <span className="mono text-[10px] uppercase tracking-widest text-[#4a4a6a]/50 group-hover:text-[#c7ceea] transition-colors">
                 {item.category} — {item.date}
               </span>
            </div>

            {/* Description */}
            <div className="hidden md:block w-72 text-right">
              <p className="font-sans text-sm text-[#4a4a6a]/60 leading-relaxed group-hover:text-[#4a4a6a] transition-colors text-balance line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>

          {/* Hover Image Reveal - Softer, blurry edges */}
          <div className="hidden md:block absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-80 h-56 bg-white opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-500 z-20 overflow-hidden shadow-[0_20px_50px_rgba(200,200,230,0.5)] rounded-2xl rotate-2 group-hover:-rotate-2">
             <img 
               src={item.imageUrl} 
               alt={item.title} 
               className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-[2s]" 
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-[#c7ceea]/30 to-[#ffb7b2]/30 mix-blend-overlay"></div>
          </div>
          
          {/* Mobile Image (Inline) */}
          <div className="md:hidden w-full h-48 overflow-hidden mt-4 rounded-lg shadow-inner">
             <img src={item.imageUrl} className="w-full h-full object-cover opacity-80" />
          </div>

        </div>
      ))}
    </div>
  );
};

export default ArchiveGrid;