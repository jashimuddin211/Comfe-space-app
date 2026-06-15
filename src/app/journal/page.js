import React from "react";
import Link from "next/link";

export default function Journal() {
  const posts = [
    {
      title: "Tactile Rhythm: The Science of Mechanical Feedback",
      excerpt: "Why mechanical keyboards improve spelling speed, reduce joint fatigue, and create psychological milestones during coding sessions.",
      date: "June 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
      category: "Hardware"
    },
    {
      title: "Chiaroscuro: Desk Lighting Configurations for Night Coding",
      excerpt: "How screen-glare-free monitor bars and color temperatures influence melatonin production, focus levels, and code comprehension.",
      date: "May 28, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400&auto=format&fit=crop",
      category: "Ergonomics"
    },
    {
      title: "Wood, Wool, & Steel: Sourcing Organic Office Materials",
      excerpt: "Exploring the tactile, acoustic, and ecological properties of authentic merino wool, American Walnut, and cork desktop pads.",
      date: "May 15, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1632292224971-0d45778b3002?q=80&w=400&auto=format&fit=crop",
      category: "Workspace Philosophy"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Title */}
      <div className="max-w-2xl mb-16 text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-title">
          Aura <span className="text-gradient">Journal Logs</span>
        </h1>
        <p className="text-text-gray text-base leading-relaxed">
          Deep-dives into workspace design, keyboard customization, lighting science, and material sourcing guidelines.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {posts.map((post, index) => (
          <article key={index} className="card glass-card group flex flex-col h-full hover:translate-y-[-4px] transition-all">
            {/* Image */}
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-white/5 bg-bg-dark mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full group-hover:scale-103 transition-transform duration-500"
              />
            </div>
            
            {/* Info */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span className="font-semibold text-brand-purple">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-title mb-2 group-hover:text-brand-purple transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-gray line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                <span className="text-xs text-text-muted">{post.readTime}</span>
                <span className="text-xs font-semibold text-brand-teal group-hover:underline cursor-pointer">Read Article &rarr;</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
