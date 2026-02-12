import React from 'react';

interface GateSectionProps {
  onNavigate: (view: string) => void;
}

const GateSection: React.FC<GateSectionProps> = ({ onNavigate }) => {
  const links = [
    { label: 'ABOUT', id: 'ABOUT', desc: 'Profile & Identity' },
    { label: 'WORKS', id: 'WORKS', desc: 'Archive of Dreams' },
    { label: 'DIARY', id: 'DIARY', desc: 'Personal Log' },
    { label: 'GUESTBOOK', id: 'GUESTBOOK', desc: 'Leave a Signal' },
  ];

  const externalLinks = [
    { label: 'Twitter / X', url: '#' },
    { label: 'Instagram', url: '#' },
    { label: 'GitHub', url: '#' },
    { label: 'Email', url: 'mailto:contact@mellow.ai' },
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-20 bg-[#fdfbf7] relative flex flex-col justify-center animate-[fade_0.5s_ease-out]">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* Internal Navigation */}
        <div className="flex flex-col gap-8">
          <div className="mono text-[#ffb7b2] text-xs tracking-[0.2em] mb-4">INTERNAL_GATEWAY</div>
          <div className="flex flex-col gap-2">
            {links.map((link, idx) => (
              <button 
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="group flex items-baseline gap-4 text-left hover:pl-4 transition-all duration-300"
              >
                <span className="mono text-xs text-[#c7ceea] group-hover:text-[#ffb7b2]">{(idx + 1).toString().padStart(2, '0')}</span>
                <div className="flex flex-col">
                   <span className="serif text-4xl md:text-6xl text-[#4a4a6a] italic group-hover:text-[#4a4a6a] opacity-80 group-hover:opacity-100 transition-opacity">
                     {link.label}
                   </span>
                   <span className="mono text-[10px] text-[#4a4a6a]/40 uppercase tracking-widest mt-1 group-hover:text-[#ffb7b2]">
                     {link.desc}
                   </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* External Links */}
        <div className="flex flex-col gap-8 md:pt-12">
           <div className="mono text-[#c7ceea] text-xs tracking-[0.2em] mb-4">EXTERNAL_SIGNALS</div>
           <div className="grid grid-cols-1 gap-6">
              {externalLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.url}
                  className="flex items-center justify-between border-b border-[#c7ceea]/30 pb-4 group interactive"
                >
                  <span className="serif text-xl text-[#4a4a6a] group-hover:pl-2 transition-all">{link.label}</span>
                  <span className="mono text-[10px] text-[#4a4a6a]/30 group-hover:text-[#ffb7b2] transition-colors">↗</span>
                </a>
              ))}
           </div>
           
           <div className="mt-12 p-6 border border-[#c7ceea]/30 rounded-lg bg-white/50 backdrop-blur-sm">
              <p className="font-sans text-sm text-[#4a4a6a]/70 leading-relaxed">
                 "Every link is a door to another room. Tread lightly, traveler."
              </p>
           </div>
        </div>

      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default GateSection;