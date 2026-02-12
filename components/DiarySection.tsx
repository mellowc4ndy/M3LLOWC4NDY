import React, { useState, useEffect } from 'react';
import DiaryDetail from './DiaryDetail';

const DEFAULT_ENTRIES = [
  { id: 1, date: '2024.02.14', title: 'Melting Clocks', content: "Time feels viscous today. Like honey dripping from a spoon. I spent three hours watching the shadows move across the floor, documenting the way light stretches before it vanishes." },
  { id: 2, date: '2024.01.20', title: 'Static Noise', content: "The television in my dream was playing a channel that doesn't exist. It sounded like rain, but softer. I woke up missing a place I've never been to." },
  { id: 3, date: '2023.12.05', title: 'Empty Playground', content: "Why do swings move when there is no wind? I captured the motion in the latest render. It feels too real." },
  { id: 4, date: '2023.11.11', title: 'Blue Screen', content: "The sky turned the exact shade of a Windows error screen today. I felt a strange sense of comfort in the malfunction." },
];

interface DiarySectionProps {
  isAdmin?: boolean;
}

const DiarySection: React.FC<DiarySectionProps> = ({ isAdmin }) => {
  const [entries, setEntries] = useState<any[]>(() => {
    const saved = localStorage.getItem('mellow_diary_entries');
    return saved ? JSON.parse(saved) : DEFAULT_ENTRIES;
  });

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<any>({ id: 0, title: '', date: '', content: '' });

  useEffect(() => {
    localStorage.setItem('mellow_diary_entries', JSON.stringify(entries));
  }, [entries]);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this memory?")) {
      setEntries(entries.filter(e => e.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const handleEdit = (entry: any) => {
    setCurrentEntry(entry);
    setIsEditing(true);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreate = () => {
    setCurrentEntry({ id: 0, title: '', date: new Date().toLocaleDateString('ko-KR'), content: '' });
    setIsEditing(true);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentEntry.id === 0) {
      // Create
      const newEntry = { ...currentEntry, id: Date.now() };
      setEntries([newEntry, ...entries]);
    } else {
      // Update
      setEntries(entries.map(e => e.id === currentEntry.id ? currentEntry : e));
    }
    setIsEditing(false);
  };

  // Render Detail View
  if (selectedId && !isEditing) {
    const entry = entries.find(e => e.id === selectedId);
    if (entry) {
        return (
             <div className="min-h-screen py-32 px-4 md:px-12 bg-[#fdfbf7]">
                <DiaryDetail entry={entry} onBack={() => setSelectedId(null)} />
             </div>
        );
    }
  }

  return (
    <div className="min-h-screen py-32 px-4 md:px-12 bg-[#fdfbf7] relative animate-[fade_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 border-b border-[#c7ceea]/30 pb-6">
            <h2 className="serif text-5xl md:text-7xl text-[#4a4a6a] tracking-tight">
            Dream Log<span className="text-[#ffb7b2]">.</span>
            </h2>
            <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
                <span className="mono text-[10px] uppercase tracking-widest text-[#4a4a6a]/50">
                // Personal Archive
                </span>
                {isAdmin && !isEditing && (
                    <button 
                        onClick={handleCreate}
                        className="mono text-xs bg-[#4a4a6a] text-white px-4 py-2 hover:bg-[#ffb7b2] transition-colors"
                    >
                        + NEW ENTRY
                    </button>
                )}
            </div>
        </div>

        {/* Admin Editor Form */}
        {isAdmin && isEditing && (
            <div className="mb-20 p-8 border border-[#c7ceea] bg-white/50 backdrop-blur-sm rounded-lg animate-[fade_0.3s_ease-out]">
                <h3 className="mono text-xs text-[#ffb7b2] mb-6 tracking-widest">
                    {currentEntry.id === 0 ? 'RECORDING_NEW_DREAM...' : 'MODIFYING_MEMORY...'}
                </h3>
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input 
                            type="text" 
                            placeholder="Title"
                            className="bg-transparent border-b border-[#c7ceea] py-2 text-2xl serif text-[#4a4a6a] focus:outline-none focus:border-[#ffb7b2]"
                            value={currentEntry.title}
                            onChange={e => setCurrentEntry({...currentEntry, title: e.target.value})}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder="YYYY.MM.DD"
                            className="bg-transparent border-b border-[#c7ceea] py-2 text-lg mono text-[#4a4a6a] focus:outline-none focus:border-[#ffb7b2]"
                            value={currentEntry.date}
                            onChange={e => setCurrentEntry({...currentEntry, date: e.target.value})}
                            required
                        />
                    </div>
                    <textarea 
                        placeholder="Describe the dream..."
                        className="bg-transparent border border-[#c7ceea]/50 p-4 min-h-[200px] font-sans text-[#4a4a6a] focus:outline-none focus:border-[#ffb7b2]"
                        value={currentEntry.content}
                        onChange={e => setCurrentEntry({...currentEntry, content: e.target.value})}
                        required
                    />
                    <div className="flex gap-4 justify-end">
                        <button 
                            type="button" 
                            onClick={() => setIsEditing(false)}
                            className="mono text-xs text-[#4a4a6a]/50 hover:text-[#4a4a6a] uppercase"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="mono text-xs bg-[#ffb7b2] text-white px-6 py-2 hover:bg-[#4a4a6a] transition-colors uppercase"
                        >
                            Save Memory
                        </button>
                    </div>
                </form>
            </div>
        )}
        
        <div className="grid grid-cols-1 gap-20 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-32 top-0 bottom-0 w-[1px] bg-[#c7ceea]/20 hidden md:block"></div>

            {entries.map(entry => (
                <div key={entry.id} className="group relative pl-0 md:pl-56 transition-all duration-500">
                    {/* Timeline Dot */}
                    <div className="absolute left-32 top-4 w-1.5 h-1.5 rounded-full bg-[#c7ceea] group-hover:bg-[#ffb7b2] group-hover:scale-150 transition-all duration-300 hidden md:block z-10"></div>
                    {/* Horizontal connector */}
                    <div className="absolute left-32 top-5 w-20 h-[1px] bg-[#c7ceea]/20 hidden md:block group-hover:w-24 transition-all duration-500"></div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <span className="mono text-xs text-[#ffb7b2] tracking-wider">{entry.date}</span>
                            {isAdmin && (
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(entry); }} className="mono text-[10px] text-[#c7ceea] hover:text-[#4a4a6a]">EDIT</button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(entry.id); }} className="mono text-[10px] text-red-300 hover:text-red-500">DELETE</button>
                                </div>
                            )}
                        </div>
                        {/* Interactive Title Triggering Detail View */}
                        <h3 
                            onClick={() => setSelectedId(entry.id)}
                            className="serif text-3xl md:text-4xl text-[#4a4a6a] italic font-normal group-hover:text-[#c7ceea] transition-colors w-fit cursor-pointer interactive"
                        >
                            {entry.title}
                        </h3>
                        <p className="font-sans text-base md:text-lg text-[#4a4a6a]/70 leading-relaxed max-w-4xl text-balance mt-2 group-hover:text-[#4a4a6a] transition-colors whitespace-pre-wrap line-clamp-3">
                            {entry.content}
                        </p>
                        {/* Read More text */}
                        <button 
                            onClick={() => setSelectedId(entry.id)}
                            className="mono text-[10px] text-[#4a4a6a]/40 hover:text-[#ffb7b2] uppercase tracking-widest mt-2 w-fit"
                        >
                            Read Full Entry →
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DiarySection;