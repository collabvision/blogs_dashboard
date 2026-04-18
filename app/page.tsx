"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      // 'no-store' prevents Next.js from showing old data
      const res = await fetch('/api/blogs', { 
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache' } 
      });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchBlogs();
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#fafafa] text-black min-h-screen p-4 md:p-8 font-sans text-sm">
      <header className="max-w-5xl mx-auto flex justify-between items-end border-b-4 border-black pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">The Feed.</h1>
          <p className="text-[10px] font-bold uppercase opacity-50">Latest Archives</p>
        </div>
        <Link href="/dashboard" className="bg-black text-white px-4 py-2 font-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase text-[10px]">
          Admin Panel
        </Link>
      </header>

      <main className="max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center py-20 font-black uppercase animate-pulse">Fetching Data...</div>
        ) : blogs.length === 0 ? (
          <div className="border-2 border-dashed border-black p-12 text-center font-black uppercase text-gray-400">
            Archive is empty
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog: any) => (
              <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
                <div className="border-2 border-black h-full bg-white shadow-[4px_4px_0px_0px_black] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all flex flex-col">
                  <div className="h-32 border-b-2 border-black overflow-hidden bg-gray-100">
                    {blog.image && <img src={blog.image} className="w-full h-full object-cover" />}
                  </div>
                  <div className="p-4 flex-1">
                    <span className="text-[8px] font-black uppercase border border-black px-1 mb-2 inline-block tracking-tighter">
                      {blog.category}
                    </span>
                    <h3 className="text-lg font-black uppercase leading-tight mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-[11px] font-medium text-gray-600 line-clamp-2 mb-4 leading-tight">
                      {blog.content.replace(/<[^>]*>/g, '')}
                    </p>
                    <div className="pt-2 border-t border-black/10 flex justify-between items-center font-black uppercase text-[9px]">
                      <span>Read More</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}