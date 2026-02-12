import React from 'react';

const TechnicalOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Soft Gradient Frame instead of Sharp Brackets */}
      <div className="absolute inset-0 border-[20px] border-white/40 mask-image-gradient"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-[#ffb7b2] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-[#c7ceea] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Grid Lines - Very subtle */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c7ceea]/20 to-transparent hidden lg:block"></div>
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c7ceea]/20 to-transparent hidden lg:block"></div>

      {/* Dream Text */}
      <div className="absolute bottom-6 left-24 mono text-[9px] text-[#4a4a6a]/40 tracking-[0.2em]">
        ENTERING_REM_CYCLE // LAYER_09
      </div>

      {/* Vertical text */}
      <div className="absolute left-4 bottom-32 mono text-[9px] text-[#4a4a6a]/30 -rotate-90 origin-bottom-left uppercase tracking-[0.3em]">
        Lucid_Dreaming
      </div>
    </div>
  );
};

export default TechnicalOverlay;