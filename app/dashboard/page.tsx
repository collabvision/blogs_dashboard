"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Trash2, Edit3, ArrowLeft, LayoutDashboard, FilePlus, Menu, X, Save, Image as ImageIcon } from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-[600px] bg-gray-50 border-4 border-black animate-pulse" />
});
import 'react-quill-new/dist/quill.snow.css';

export default function ProfessionalDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [view, setView] = useState<'create' | 'manage'>('create');
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({ 
    id: '', title: '', content: '', category: 'Tech', image: '', bgColor: '#ffffff', animation: 'animate__fadeIn'
  });

useEffect(() => {
  setMounted(true);
  // Retrieve from LocalStorage instead of the API
  const saved = localStorage.getItem('local_blogs');
  if (saved) {
    try {
      setBlogs(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to parse blogs from LocalStorage", e);
      setBlogs([]);
    }
  }
}, []);
  
  

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }, { 'align': [] }],
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ],
  };

const sync = (list: any[]) => {
  setBlogs(list); // Update UI state
  
  // Save directly to the browser's LocalStorage
  localStorage.setItem('local_blogs', JSON.stringify(list));
};

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newList = isEditing 
      ? blogs.map(b => b.id === formData.id ? formData : b)
      : [{ ...formData, id: Date.now().toString() }, ...blogs];
    
    sync(newList);
    setFormData({ id: '', title: '', content: '', category: 'Tech', image: '', bgColor: '#ffffff', animation: 'animate__fadeIn' });
    setIsEditing(false);
    setView('manage');
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-white text-black font-sans relative">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 border-r-8 border-black flex-col p-8 sticky top-0 h-screen bg-white">
        <div className="text-4xl font-black uppercase italic mb-12 tracking-tighter underline">Admin.</div>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => setView('manage')} className={`p-4 font-black border-4 border-black transition-all ${view === 'manage' ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0px_0px_black]'}`}>MANAGE ALL</button>
          <button onClick={() => { setIsEditing(false); setView('create'); }} className={`p-4 font-black border-4 border-black transition-all ${view === 'create' && !isEditing ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white shadow-[4px_4px_0px_0px_black]'}`}>NEW POST</button>
          <Link href="/" className="p-4 font-black border-4 border-black bg-yellow-400 shadow-[4px_4px_0px_0px_black] hover:bg-black hover:text-white flex items-center gap-2 uppercase text-xs"><ArrowLeft size={16}/> View Site</Link>
        </nav>
      </aside>

      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 w-full p-4 border-b-4 border-black bg-white z-50 flex justify-between items-center font-black italic">
        ADMIN. <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 border-2 border-black"><Menu /></button>
      </header>

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white p-10 flex flex-col gap-6 lg:hidden animate__animated animate__fadeIn">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end border-4 border-black p-2"><X size={32}/></button>
            <button onClick={() => { setView('manage'); setIsMobileMenuOpen(false); }} className="p-6 border-4 border-black font-black text-2xl uppercase">Manage</button>
            <button onClick={() => { setView('create'); setIsMobileMenuOpen(false); }} className="p-6 border-4 border-black font-black text-2xl uppercase">Create</button>
            <Link href="/" className="p-6 border-4 border-black font-black text-2xl bg-yellow-400 text-center uppercase">Home</Link>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-12 mt-16 lg:mt-0">
        {view === 'create' ? (
          <form onSubmit={submit} className="max-w-6xl mx-auto space-y-8 animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-4xl font-black uppercase italic underline decoration-blue-500">{isEditing ? 'Modify Entry' : 'Create Entry'}</h2>
              {isEditing && <button type="button" onClick={() => { setIsEditing(false); setView('manage'); }} className="text-red-600 font-black uppercase underline">Discard Changes</button>}
            </div>

            <input 
              className="w-full border-4 border-black p-5 text-2xl md:text-5xl font-black outline-none shadow-[10px_10px_0px_0px_black] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
              placeholder="THE HEADLINE..."
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-4 border-black p-4 bg-gray-50 flex justify-between items-center shadow-[4px_4px_0px_0px_black]">
                <span className="font-black text-xs uppercase italic">Canvas BG</span>
                <input type="color" value={formData.bgColor} onChange={e => setFormData({...formData, bgColor: e.target.value})} className="w-12 h-10 border-2 border-black cursor-pointer" />
              </div>
              <div className="border-4 border-black p-4 bg-gray-50 flex justify-between items-center shadow-[4px_4px_0px_0px_black]">
                <span className="font-black text-xs uppercase italic">Category</span>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-transparent font-black uppercase outline-none">
                  <option>Technology</option><option>Personal</option><option>Design</option>
                </select>
              </div>
              <div className="border-4 border-black p-4 bg-gray-50 flex justify-between items-center shadow-[4px_4px_0px_0px_black]">
                <span className="font-black text-xs uppercase italic">Entrance</span>
                <select value={formData.animation} onChange={e => setFormData({...formData, animation: e.target.value})} className="bg-transparent font-black uppercase outline-none">
                  <option value="animate__fadeIn">Fade</option><option value="animate__zoomIn">Zoom</option><option value="animate__bounceIn">Bounce</option><option value="animate__slideInUp">Slide Up</option>
                </select>
              </div>
            </div>

            {/* IMAGE PREVIEW COMPONENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-4 border-black p-8 bg-white flex flex-col justify-center items-center gap-6 shadow-[8px_8px_0px_0px_black]">
                <div className="text-center font-black uppercase">
                  <ImageIcon size={48} className="mx-auto mb-2"/>
                  <p className="text-sm">Thumbnail Upload</p>
                </div>
                <label className="w-full bg-black text-white p-4 font-black uppercase text-center cursor-pointer hover:bg-gray-800 transition-all">
                  Choose File
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData({...formData, image: reader.result as string});
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
              </div>
              <div className="h-64 border-4 border-black bg-gray-50 flex items-center justify-center shadow-[8px_8px_0px_0px_black] overflow-hidden">
                {formData.image ? <img src={formData.image} className="w-full h-full object-cover animate__animated animate__fadeIn" /> : <p className="font-black text-gray-300 italic uppercase">Preview Ready</p>}
              </div>
            </div>

            {/* QUILL EDITOR */}
            <div className="min-h-[650px] mb-20">
              <ReactQuill theme="snow" value={formData.content} onChange={(v) => setFormData({...formData, content: v})} modules={modules} className="h-[600px] border-black"/>
            </div>

            <button className="w-full bg-black text-white py-8 text-3xl font-black uppercase hover:bg-blue-600 shadow-[10px_10px_0px_0px_black] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all">
              {isEditing ? "Sync Database" : "Push to Live Site"}
            </button>
          </form>
        ) : (
          /* MANAGEMENT SECTION */
          <section className="max-w-6xl mx-auto space-y-12 animate__animated animate__fadeIn">
            <h2 className="text-4xl font-black uppercase italic underline decoration-yellow-400 tracking-tighter">Site Archives</h2>
            <div className="grid gap-8">
              {blogs.length === 0 ? (
                <div className="p-20 border-8 border-dotted border-black text-center text-3xl font-black uppercase opacity-20 italic">Empty Archives</div>
              ) : (
                blogs.map(blog => (
                  <div key={blog.id} className="border-4 border-black p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-[10px_10px_0px_0px_black] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-24 h-16 border-4 border-black flex-shrink-0 bg-gray-100">
                        {blog.image && <img src={blog.image} className="w-full h-full object-cover" />}
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black inline-block mb-1">{blog.category}</span>
                        <h3 className="text-xl md:text-2xl font-black uppercase truncate max-w-sm md:max-w-xl">{blog.title}</h3>
                      </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button onClick={() => { setFormData(blog); setIsEditing(true); setView('create'); }} className="flex-1 md:flex-none p-4 border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-all text-xs">Edit</button>
                      <button onClick={() => sync(blogs.filter(b => b.id !== blog.id))} className="flex-1 md:flex-none p-4 border-4 border-black text-red-600 font-black uppercase hover:bg-red-600 hover:text-white transition-all text-xs">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}