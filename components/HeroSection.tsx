import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[85vh] bg-[#fdfbf7] overflow-hidden flex flex-col justify-center">
      {/* Abstract Graphic Element - The 'Cloud' */}
      <div className="absolute right-0 top-0 w-2/3 h-full mix-blend-multiply opacity-60 transition-all duration-1000">
         <div className="absolute inset-0 bg-gradient-to-br from-[#e2f0cb] via-[#c7ceea] to-[#ffb7b2] blur-[100px] opacity-50"></div>
         {/* Floating Bubbles */}
         <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-white blur-3xl opacity-60 animate-[float_10s_ease-in-out_infinite]"></div>
         <style>{`
           @keyframes float {
             0%, 100% { transform: translateY(0); }
             50% { transform: translateY(-20px); }
           }
         `}</style>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center h-full">
        {/* Typography Block */}
        <div className="w-full md:w-1/2 pt-20 md:pt-0">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-white/50 backdrop-blur-sm border border-[#fff]">
            <span className="mono text-[9px] uppercase tracking-widest text-[#4a4a6a] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#ffb7b2] rounded-full shadow-[0_0_8px_#ffb7b2]"></span>
              You are safe here
            </span>
          </div>
          
          <h1 className="flex flex-col">
            <span className="serif text-6xl md:text-8xl lg:text-9xl font-normal text-[#4a4a6a] leading-[0.9] tracking-tight z-20 mix-blend-darken">
              PASTEL
            </span>
            <span className="serif text-6xl md:text-8xl lg:text-9xl font-normal italic text-[#c7ceea] leading-[0.9] tracking-tight ml-8 md:ml-16 z-20 mix-blend-multiply">
              GHOSTS
            </span>
          </h1>
          
          <div className="mt-8 pl-4 border-l border-[#ffb7b2] max-w-sm">
            <p className="font-sans text-sm md:text-base text-[#4a4a6a]/70 leading-relaxed">
              Drifting through the hallways of memory.<br/>
              Everything is soft, everything is okay.
            </p>
          </div>
        </div>

        {/* Decorative Data Block */}
        <div className="w-full md:w-1/2 h-full flex items-end justify-end pb-12 pr-6 hidden md:flex">
           <div className="text-right space-y-2">
             <div className="serif text-[#c7ceea] text-2xl italic">"Is this a dream?"</div>
             <div className="mono text-[9px] text-[#4a4a6a]/50 tracking-widest uppercase">
               Sector 09 // MellowCandy <br/>
               Liminal Space Database
             </div>
             {/* Spinning Element - Softened */}
             <div className="mt-4 flex justify-end">
               <div className="w-24 h-24 border border-[#c7ceea]/50 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                 <div className="w-16 h-16 bg-[#ffb7b2]/10 rounded-full blur-md"></div>
               </div>
             </div>
           </div>
        </div>
      </div>

      {/* Floating text marquee */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden whitespace-nowrap z-0 opacity-[0.03] pointer-events-none">
        <span className="text-[8rem] serif font-medium text-[#4a4a6a] leading-none">
          DREAM DREAM DREAM DREAM DREAM
        </span>
      </div>
    </div>
  );
};

export default HeroSection;