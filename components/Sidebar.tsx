import React from 'react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const mainNav = [
    { label: 'HOME', id: 'HOME', code: '00' },
    { label: 'ABOUT', id: 'ABOUT', code: '01' },
    { label: 'WORKS', id: 'WORKS', code: '02' },
  ];

  const personalNav = [
    { label: 'DIARY', id: 'DIARY', code: '03' },
    { label: 'GUESTBOOK', id: 'GUESTBOOK', code: '04' },
  ];

  // Using a component for consistent rendering and fixed height container
  const NavItem = ({ item, isLast }: { item: any, isLast?: boolean }) => {
    const isActive = activeView === item.id;
    return (
      <button
        onClick={() => onNavigate(item.id)}
        // Fixed height (h-24) ensures consistent vertical rhythm regardless of rotated text length
        className={`group relative flex items-center justify-center focus:outline-none w-10 h-24 ${isLast ? '' : 'mb-2'}`}
      >
        <span className={`absolute -left-6 mono text-[8px] transition-all duration-500 -rotate-90 ${isActive ? 'text-[#ffb7b2] opacity-100' : 'text-[#c7ceea] opacity-0 group-hover:opacity-100'}`}>
          {item.code}
        </span>
        <span className={`serif text-xs font-medium tracking-widest -rotate-90 whitespace-nowrap transition-all duration-300 ${isActive ? 'text-[#4a4a6a] scale-110 font-semibold' : 'text-[#4a4a6a]/40 hover:text-[#4a4a6a] hover:scale-110'}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-20 xl:w-24 bg-[#fdfbf7] border-r border-[#c7ceea]/30 flex-col justify-between items-center py-8 z-40 backdrop-blur-sm">
      <div 
        className="flex flex-col items-center gap-4 cursor-pointer"
        onClick={() => onNavigate('HOME')}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#4a4a6a]"></div>
        <span className="mono text-[10px] font-bold tracking-widest -rotate-90 whitespace-nowrap text-[#ffb7b2] hover:text-[#4a4a6a] transition-colors">
          MELLOW_CANDY
        </span>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Main Section */}
        {mainNav.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}

        {/* Visual Separator */}
        <div className="my-2 flex flex-col items-center justify-center opacity-30 py-4">
           <div className="w-[1px] h-8 bg-[#4a4a6a]"></div>
        </div>

        {/* Personal Section */}
        {personalNav.map((item, idx) => (
          <NavItem key={item.id} item={item} isLast={idx === personalNav.length - 1} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className={`w-2 h-2 rounded-full border transition-all duration-500 shadow-[0_0_10px_rgba(255,183,178,0.5)] ${activeView === 'HOME' ? 'bg-[#ffb7b2] border-[#ffb7b2]' : 'border-[#c7ceea] hover:bg-[#ffb7b2] hover:border-[#ffb7b2]'}`}></div>
        <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-[#4a4a6a]"></div>
      </div>
    </nav>
  );
};

export default Sidebar;