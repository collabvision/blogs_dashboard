"use client";

import { useEffect, useState } from "react";
import { getBlogs } from "@/utils/storage";
import BlogCard from "@/components/BlogCard";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(getBlogs());
  }, []);

  return (
    <div className="p-10 grid grid-cols-3 gap-4">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}