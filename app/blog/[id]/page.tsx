"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function SingleBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from API instead of localStorage
    fetch('/api/blogs', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        // Find the blog that matches the ID from the URL
        const found = data.find((b: any) => b.id === id);
        setBlog(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load article:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-20 text-center font-black uppercase italic">Scanning Archives...</div>;
  
  if (!blog) return (
    <div className="p-20 text-center">
      <h1 className="text-2xl font-black uppercase mb-4">Article Not Found</h1>
      <button onClick={() => router.push('/')} className="border-2 border-black p-2 font-black uppercase text-xs">Return Home</button>
    </div>
  );

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: blog.bgColor }}>
      <nav className="p-4 border-b-2 border-black bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <button onClick={() => router.back()} className="flex items-center gap-2 font-black uppercase border-2 border-black px-3 py-1 bg-black text-white transition text-xs">
          <ArrowLeft size={14}/> Back
        </button>
      </nav>

      <article className={`max-w-3xl mx-auto py-10 px-6 animate__animated ${blog.animation} overflow-hidden`}>
        {blog.image && (
          <img src={blog.image} className="w-full h-auto max-h-[400px] object-cover border-4 border-black mb-8 shadow-[6px_6px_0px_0px_black]" />
        )}
        <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight mb-8 tracking-tighter text-black break-words">
          {blog.title}
        </h1>
        
        <div 
          className="prose prose-sm md:prose-base max-w-none leading-relaxed blog-render text-black break-words font-medium"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </article>

      <style jsx global>{`
        .blog-render img { max-width: 100%; height: auto; border: 2px solid black; }
        .blog-render pre { background: #000; color: #fff; padding: 1rem; border-radius: 0; }
        /* This ensures the Quill styles look good on the final page */
      `}</style>
    </div>
  );
}