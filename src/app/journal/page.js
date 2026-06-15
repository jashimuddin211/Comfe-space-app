import React from "react";
import Link from "next/link";

export default function Journal() {
  const posts = [
    {
      title: "Tactile Rhythm: The Mechanics of Physical Feedback",
      excerpt: "Analyzing how mechanical keyboards influence typing cadence, reduce finger joint fatigue, and create clear psychological focus limits.",
      date: "June 12, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop",
      category: "Hardware"
    },
    {
      title: "Asymmetrical Chiaroscuro: Screen lighting guidelines",
      excerpt: "How screen-glare-free monitor bars and correct color temperatures influence eye strain, melatonin levels, and developer focus.",
      date: "May 28, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=400&auto=format&fit=crop",
      category: "Ergonomics"
    },
    {
      title: "Organic Fixtures: The acoustic properties of Merino & Cork",
      excerpt: "Comparing the density, liquid-resistance, and acoustic absorption values of natural wool felt and cork desk paddings.",
      date: "May 15, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1632292224971-0d45778b3002?q=80&w=400&auto=format&fit=crop",
      category: "Material Logs"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Title */}
      <div className="max-w-2xl mb-12 text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 font-sans uppercase">
          comfe<span className="text-brand-blue">Space Logs</span>
        </h1>
        <p className="text-text-gray text-xs leading-relaxed">
          Technical specifications, material inspections, lighting studies, and workspace configurations design logs.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {posts.map((post, index) => (
          <article key={index} className="card glass-card group flex flex-col h-full rounded p-4">
            {/* Image */}
            <div className="aspect-[16/10] rounded-sm overflow-hidden border border-white/10 bg-bg-dark mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full filter brightness-95"
              />
            </div>
            
            {/* Info */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-text-muted mb-2 font-mono">
                  <span className="font-semibold text-brand-blue">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 group-hover:text-brand-blue transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-text-gray line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto font-mono text-[10px]">
                <span className="text-text-muted">{post.readTime}</span>
                <span className="font-semibold text-brand-blue group-hover:underline cursor-pointer">Read &rarr;</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
