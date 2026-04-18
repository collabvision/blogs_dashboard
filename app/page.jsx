"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  
  // Update this specific line:
  fetch('/api/blogs', { cache: 'no-store' }) 
    .then((res) => res.json())
    .then((data) => {
      setBlogs(Array.isArray(data) ? data : []);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

  if (!mounted) return null;

  
  return (
    <div className="bg-white text-black min-h-screen p-6 md:p-12">
      <header className="max-w-7xl mx-auto flex justify-between items-center border-b-8 border-black pb-8 mb-12">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">The Journal.</h1>
        <Link href="/dashboard" className="bg-black text-white px-6 py-3 font-black hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
          ADMIN DASHBOARD
        </Link>
      </header>

      <main className="max-w-7xl mx-auto">
        {blogs.length === 0 ? (
          <div className="border-4 border-dashed border-black p-20 text-center font-black uppercase text-2xl">
            No Stories Found
          </div>
        ) : (
          /* GRID LAYOUT FOR CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.id}`} key={blog.id} className="group">
                <div className="border-4 border-black h-full bg-white flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                  
                  {/* Card Image */}
                  <div className="h-56 border-b-4 border-black overflow-hidden bg-gray-100">
                    {blog.image ? (
                      <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    ) : (
                      <div className="flex items-center justify-center h-full font-black text-gray-300">NO IMAGE</div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-black uppercase mb-2 block text-gray-500 tracking-widest">
                      {blog.category}
                    </span>
                    <h3 className="text-2xl font-black uppercase mb-4 line-clamp-2 leading-none">
                      {blog.title}
                    </h3>
                    
                    {/* Short Preview (Trims HTML tags for the card preview) */}
                    <p className="text-sm font-bold text-gray-600 line-clamp-3 mb-6">
                      {blog.content.replace(/<[^>]*>/g, '')}
                    </p>

                    <div className="mt-auto pt-4 border-t-2 border-black flex items-center justify-between font-black uppercase text-sm">
                      <span>Read Article</span>
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