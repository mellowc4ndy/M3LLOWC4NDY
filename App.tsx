import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from './constants';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorksSection from './components/WorksSection';
import DiarySection from './components/DiarySection';
import GuestbookSection from './components/GuestbookSection';
import GateSection from './components/GateSection';
import TechnicalOverlay from './components/TechnicalOverlay';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('HOME');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Admin State
  
  // Custom Cursor Logic
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 800, fill: "forwards", easing: "cubic-bezier(0.25, 1, 0.5, 1)" });
      }

      const target = e.target as HTMLElement;
      const isHoverable = target.closest('a, button, .interactive, input, textarea');
      if (isHoverable) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    setTimeout(() => setLoading(false), 2500);
    
    // Check if admin session exists
    const adminSession = localStorage.getItem('mellow_admin_session');
    if (adminSession === 'true') setIsAdmin(true);

    return () => clearInterval(timer);
  }, []);

  const handleAdminLogin = () => {
    if (isAdmin) {
      if(window.confirm("Logout from System?")) {
        setIsAdmin(false);
        localStorage.removeItem('mellow_admin_session');
      }
      return;
    }
    const pwd = prompt("ENTER SYSTEM KEY:");
    if (pwd === "mellow") { // Simple password
      setIsAdmin(true);
      localStorage.setItem('mellow_admin_session', 'true');
      alert("SYSTEM ACCESS GRANTED");
    } else if (pwd) {
      alert("ACCESS DENIED");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'HOME':
        return <HeroSection />;
      case 'ABOUT':
        return <AboutSection />;
      case 'WORKS':
        return <WorksSection isAdmin={isAdmin} />;
      case 'DIARY':
        return <DiarySection isAdmin={isAdmin} />;
      case 'GUESTBOOK':
        return <GuestbookSection isAdmin={isAdmin} />;
      case 'GATE':
        return <GateSection onNavigate={setActiveView} />;
      default:
        return <HeroSection />;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfbf7] text-[#4a4a6a] z-[100] cursor-none">
        <div className="max-w-xs w-full px-8 text-center">
           <div className="mb-8 relative">
              <div className="w-16 h-16 bg-[#ffb7b2] rounded-full mx-auto blur-xl animate-pulse opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center serif italic text-2xl">Zzz...</div>
           </div>
           
           <div className="space-y-2 mono text-[10px] text-[#4a4a6a]/60">
              <p className="animate-[fade_1s_0.5s_both]">ENTERING_DREAM_STATE...</p>
              <p className="animate-[fade_1s_1.5s_both] text-[#ffb7b2]">...OPEN_EYES</p>
           </div>
        </div>
        <style>{`
          @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#fdfbf7] overflow-hidden selection:bg-[#ffb7b2] selection:text-white transition-colors duration-1000 z-10">
      <div ref={cursorDotRef} className="cursor-dot hidden md:block"></div>
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block"></div>

      <TechnicalOverlay />
      
      {/* Sidebar with separator logic */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      <main className="min-h-screen lg:pl-24 relative transition-all duration-700 z-20 flex flex-col">
        {/* Sticky Header with Menu Button */}
        <header className="sticky top-0 z-30 px-6 py-4 flex justify-between items-end border-b border-[#c7ceea]/20 bg-[#fdfbf7]/60 backdrop-blur-md">
          <div className="flex flex-col cursor-pointer" onClick={() => setActiveView('HOME')}>
            <h1 className="mono text-xs font-bold tracking-widest uppercase text-[#4a4a6a] interactive hover:text-[#ffb7b2] transition-colors cursor-none">
              {PROFILE.nickname}
            </h1>
            <span className="serif text-[10px] italic text-[#4a4a6a]/60">
              {PROFILE.role}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 mono text-[9px] text-[#4a4a6a]/50 tracking-widest">
              <span className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full shadow-sm transition-colors duration-500 ${isAdmin ? 'bg-red-400 animate-pulse' : 'bg-[#e2f0cb]'}`}></span>
                {isAdmin ? 'SYSTEM_OVERRIDE' : PROFILE.location}
              </span>
              <span>{currentTime}</span>
            </div>
            
            {/* Mobile/Quick Menu Button */}
            <button 
              onClick={() => setActiveView('GATE')}
              className="mono text-[10px] text-[#4a4a6a] border border-[#c7ceea] px-3 py-1 rounded-full hover:bg-[#4a4a6a] hover:text-white transition-all interactive uppercase tracking-wider"
            >
              Menu
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div key={activeView} className="flex-grow">
          {renderContent()}
        </div>

        <footer className="px-6 py-12 border-t border-[#c7ceea]/20 bg-[#fdfbf7] flex flex-col md:flex-row justify-between gap-8">
           <div className="flex flex-col gap-2">
             <h4 className="serif text-xl italic text-[#4a4a6a]">MellowCandy Dreamscape</h4>
             <p className="mono text-[10px] text-[#4a4a6a]/50 max-w-xs">
               Don't wake up yet. <br/>All dreams are stored locally.
             </p>
           </div>
           
           <div className="flex gap-8 mono text-[10px] uppercase tracking-widest">
              <div className="flex flex-col gap-2">
                 <span className="text-[#ffb7b2] font-bold">Connect</span>
                 <a href="#" className="hover:text-[#4a4a6a] interactive transition-colors">Twitter</a>
                 <a href="#" className="hover:text-[#4a4a6a] interactive transition-colors">Postype</a>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-[#ffb7b2] font-bold">Signal</span>
                 <a href="mailto:contact@mellow.ai" className="hover:text-[#4a4a6a] interactive transition-colors">Mail_Link</a>
                 {/* Admin Login Trigger */}
                 <button onClick={handleAdminLogin} className="text-left hover:text-[#ffb7b2] interactive transition-colors uppercase">
                   {isAdmin ? 'Logout' : 'Admin'}
                 </button>
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;