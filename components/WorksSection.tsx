import React, { useState, useEffect } from 'react';
import ArchiveGrid from './ArchiveGrid';
import WorkDetail from './WorkDetail';
import { ARCHIVE_DATA } from '../constants';
import type { ArchiveItem } from '../types';

interface WorksSectionProps {
  isAdmin?: boolean;
}

const WorksSection: React.FC<WorksSectionProps> = ({ isAdmin }) => {
  const [items, setItems] = useState<ArchiveItem[]>(() => {
    const saved = localStorage.getItem('mellow_works_data');
    return saved ? JSON.parse(saved) : ARCHIVE_DATA;
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<ArchiveItem>({
    id: '',
    title: '',
    category: '',
    date: '',
    description: '',
    imageUrl: '',
    code: ''
  });

  useEffect(() => {
    localStorage.setItem('mellow_works_data', JSON.stringify(items));
  }, [items]);

  const handleDelete = (id: string) => {
    if (window.confirm("Archive this item?")) {
      setItems(items.filter(i => i.id !== id));
      if (selectedId === id) setSelectedId(null);
    }
  };

  const handleEdit = (item: ArchiveItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    // Ensure detail view is closed when editing from list
    setSelectedId(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreate = () => {
    setCurrentItem({
      id: '',
      title: '',
      category: '',
      date: new Date().getFullYear().toString(),
      description: '',
      imageUrl: 'https://picsum.photos/seed/new/800/1000',
      code: 'NEW-000'
    });
    setIsEditing(true);
    setSelectedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem.id) {
        // Create
        const newItem = { ...currentItem, id: Date.now().toString() };
        setItems([newItem, ...items]);
    } else {
        // Update
        setItems(items.map(i => i.id === currentItem.id ? currentItem : i));
    }
    setIsEditing(false);
  };

  // Logic to render Detail View
  if (selectedId && !isEditing) {
    const selectedItem = items.find(i => i.id === selectedId);
    if (selectedItem) {
      return (
        <section className="min-h-screen px-4 md:px-12 py-32 relative z-10 bg-[#fdfbf7]">
           <div className="max-w-7xl mx-auto">
             <WorkDetail item={selectedItem} onBack={() => setSelectedId(null)} />
           </div>
        </section>
      );
    }
  }

  return (
    <section className="min-h-screen px-4 md:px-12 py-32 relative z-10 bg-[#fdfbf7] animate-[fade_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-[#c7ceea]/30 pb-4">
           <h2 className="serif text-5xl md:text-7xl text-[#4a4a6a] tracking-tight">
             Works<span className="text-[#ffb7b2]">.</span>
           </h2>
           <div className="flex flex-col items-end gap-2 mt-4 md:mt-0">
             <p className="mono text-[10px] uppercase tracking-widest text-[#4a4a6a]/50">
               // Recovered Fragments
             </p>
             {isAdmin && !isEditing && (
                 <button 
                    onClick={handleCreate}
                    className="mono text-xs bg-[#4a4a6a] text-white px-4 py-2 hover:bg-[#ffb7b2] transition-colors"
                 >
                    + ADD WORK
                 </button>
             )}
           </div>
        </div>

        {/* Admin Form */}
        {isAdmin && isEditing && (
             <div className="mb-20 p-8 border border-[#c7ceea] bg-white/50 backdrop-blur-sm rounded-lg animate-[fade_0.3s_ease-out]">
                <h3 className="mono text-xs text-[#ffb7b2] mb-6 tracking-widest">
                    {currentItem.id ? 'EDITING_ARCHIVE...' : 'NEW_ARCHIVE_ENTRY...'}
                </h3>
                <form onSubmit={handleSave} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Title" required className="bg-transparent border-b border-[#c7ceea] py-2 serif text-xl" value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} />
                        <input type="text" placeholder="Category (e.g. SURREAL · SPACE)" required className="bg-transparent border-b border-[#c7ceea] py-2 mono text-sm" value={currentItem.category} onChange={e => setCurrentItem({...currentItem, category: e.target.value})} />
                        <input type="text" placeholder="Date" required className="bg-transparent border-b border-[#c7ceea] py-2 mono text-sm" value={currentItem.date} onChange={e => setCurrentItem({...currentItem, date: e.target.value})} />
                        <input type="text" placeholder="Code (e.g. REF-001)" required className="bg-transparent border-b border-[#c7ceea] py-2 mono text-sm" value={currentItem.code} onChange={e => setCurrentItem({...currentItem, code: e.target.value})} />
                        <input type="text" placeholder="Image URL" required className="bg-transparent border-b border-[#c7ceea] py-2 mono text-sm md:col-span-2" value={currentItem.imageUrl} onChange={e => setCurrentItem({...currentItem, imageUrl: e.target.value})} />
                    </div>
                    <textarea placeholder="Description" required className="bg-transparent border border-[#c7ceea]/50 p-4 min-h-[100px] font-sans" value={currentItem.description} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} />
                    <div className="flex gap-4 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="mono text-xs text-[#4a4a6a]/50 uppercase">Cancel</button>
                        <button type="submit" className="mono text-xs bg-[#ffb7b2] text-white px-6 py-2 uppercase hover:bg-[#4a4a6a] transition-colors">Save Work</button>
                    </div>
                </form>
             </div>
        )}

        <ArchiveGrid 
            items={items} 
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onItemClick={(id) => setSelectedId(id)}
        />
      </div>
      <style>{`
        @keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
};

export default WorksSection;
