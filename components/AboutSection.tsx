import React from 'react';

const AboutSection: React.FC = () => {
  const externalLinks = [
    { name: 'Twitter / X', url: '#', desc: 'Real-time Thoughts' },
    { name: 'Postype', url: '#', desc: 'Long-form Essays' },
    { name: 'Instagram', url: '#', desc: 'Visual Logs' },
    { name: 'Email', url: 'mailto:contact@mellow.ai', desc: 'Direct Signal' },
  ];

  return (
    <section className="relative min-h-screen bg-[#c7ceea]/10 text-[#4a4a6a] px-6 py-32 md:px-20 overflow-hidden flex flex-col items-center animate-[fade_0.5s_ease-out]">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 md:order-1">
             <div className="mono text-[#ffb7b2] text-xs tracking-[0.2em] mb-4">LUCID // PROFILE</div>
             <h3 className="serif text-4xl md:text-5xl leading-tight mb-8">
               "We are made of soft things."
             </h3>
             <div className="space-y-6 font-sans text-[#4a4a6a]/80 leading-relaxed text-lg text-balance">
               <p>
                 MellowCandy exists in the space between waking and sleeping. Designing worlds that feel like a childhood afternoon.
               </p>
               <p>
                 Inspired by old cartoons, empty shopping malls, and the comfort of being alone. This archive is a collection of things that might have happened.
               </p>
               <p>
                  Every pixel is placed with the intention of creating a digital sanctuary. A place where time moves slower.
               </p>
             </div>
             
             <div className="mt-12 flex gap-8 mono text-xs">
               <div>
                 <span className="block text-[#4a4a6a]/40 mb-1">State</span>
                 <span className="text-[#ffb7b2]">Daydreaming</span>
               </div>
               <div>
                 <span className="block text-[#4a4a6a]/40 mb-1">Access</span>
                 <span>Open</span>
               </div>
               <div>
                 <span className="block text-[#4a4a6a]/40 mb-1">Reality</span>
                 <span>Uncertain</span>
               </div>
             </div>
          </div>
          
          <div className="order-1 md:order-2 relative group interactive flex justify-center">
             <div className="relative w-80 h-80 md:w-96 md:h-96">
               <div className="absolute -inset-4 rounded-full border border-white/40 animate-[spin_10s_linear_infinite]"></div>
               <div className="relative bg-white w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                  <span className="serif text-[8rem] text-[#c7ceea]/20 font-bold italic select-none">M</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#ffb7b2]/20 to-transparent"></div>
               </div>
               {/* Orbital Elements */}
               <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#e2f0cb] rounded-full mix-blend-multiply blur-xl opacity-60 animate-pulse"></div>
             </div>
          </div>
        </div>

        {/* New Social Links Section */}
        <div className="border-t border-[#c7ceea]/30 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
             <h4 className="mono text-[#4a4a6a]/50 text-xs tracking-[0.2em] uppercase">Frequency / Channels</h4>
             <span className="hidden md:block mono text-[9px] text-[#4a4a6a]/30">Establish Connection</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
             {externalLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  className="group relative p-6 bg-white/40 hover:bg-white/80 border border-transparent hover:border-[#ffb7b2] transition-all duration-300 rounded-lg interactive flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="serif text-xl text-[#4a4a6a] italic group-hover:text-[#4a4a6a] transition-colors">{link.name}</span>
                    <span className="mono text-[10px] text-[#c7ceea] group-hover:text-[#ffb7b2] -rotate-45 group-hover:rotate-0 transition-transform duration-300">➜</span>
                  </div>
                  <span className="mono text-[9px] text-[#4a4a6a]/40 uppercase tracking-widest">{link.desc}</span>
                </a>
             ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
};

export default AboutSection;