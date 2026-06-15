"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getItems } from "@/lib/itemsStore";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    // Load first 3 items as featured products
    const items = getItems();
    setFeaturedItems(items.slice(0, 3));
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Thoughtful Ergonomics",
      description: "Every dimension and material choice is engineered to support natural posture, reduce strain, and increase daily endurance."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.252.588 1.81l-3.974 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.89a1 1 0 00-1.176 0l-3.976 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 9.72c-.773-.558-.375-1.81.587-1.81H8.5c.417 0 .79-.264.95-.69l1.519-4.674z" />
        </svg>
      ),
      title: "Premium Materials",
      description: "We source only genuine American Walnut, high-density merino wool, and anodized aircraft-grade aluminum for everlasting quality."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Custom Integrations",
      description: "Tailor your desk environments. Features addressable lighting control, hot-swappable switches, and modular organizers."
    }
  ];

  const testimonials = [
    {
      quote: "Aura Space completely transformed how my coding desk feels. The keyboard casing and the light bar have dramatically reduced eye strain and wrist fatigue.",
      author: "Sarah Jenkins",
      role: "Lead Software Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      quote: "The merino wool desk mat is exceptionally comfortable and adds instant texture. The attention to detail in their packaging and design is unmatched.",
      author: "Marcus Chen",
      role: "Senior Product Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    {
      quote: "I was skeptical about monitor light bars, but the Luna screen-glare-free design is flawless. Writing scripts at night feels incredibly immersive.",
      author: "Elena Rostova",
      role: "Creative Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full">
      {/* Background radial glows for aesthetic vibe */}
      <div className="bg-radial-glow top-[-100px] left-[-200px]" />
      <div className="bg-radial-glow top-[40%] right-[-300px]" />

      {/* 2. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-24 md:py-32">
        <div className="container mx-auto px-6 text-center z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-brand-teal">
              Batch 04 Now Available
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Curate Your Perfect{" "}
            <span className="text-gradient">Workspace Focus</span>
          </h1>
          <p className="text-base md:text-xl text-text-gray max-w-2xl mx-auto mb-10 leading-relaxed">
            Minimalist, functional, and premium workspace gear designed to eliminate distractions, elevate your daily productivity, and inspire creative flow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/items" className="btn btn-primary px-8 py-3.5 text-base w-full sm:w-auto font-medium">
              Explore Collection
            </Link>
            <Link href="/about" className="btn btn-secondary px-8 py-3.5 text-base w-full sm:w-auto font-medium">
              Our Design Story
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Features Section (4 Relevant Sections - Section 1) */}
      <section id="features" className="section border-t border-white/5 relative z-10 bg-bg-dark/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed For Deep Work
            </h2>
            <p className="text-text-gray text-base leading-relaxed">
              Every detail is meticulously crafted to support long-term productivity and aesthetic cohesion in your home office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="card glass-card hover:translate-y-[-6px] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-title">{feature.title}</h3>
                <p className="text-sm text-text-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products (4 Relevant Sections - Section 2) */}
      <section className="section border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Gear
              </h2>
              <p className="text-text-gray max-w-md">
                A selection of our popular, handcrafted workspace products.
              </p>
            </div>
            <Link
              href="/items"
              className="group text-brand-purple font-medium text-sm inline-flex items-center gap-1.5 hover:text-brand-purple/80 transition-colors"
            >
              View Full Catalog
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <div key={item.id} className="card glass-card group flex flex-col h-full">
                  {/* Image Container */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-6 border border-white/5 bg-bg-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-purple bg-bg-dark/80 backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-bold font-title text-white group-hover:text-brand-purple transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-semibold text-brand-teal">${item.price}</span>
                    </div>
                    <p className="text-sm text-text-gray line-clamp-2 mb-6 flex-grow leading-relaxed">
                      {item.shortDescription}
                    </p>
                    <Link
                      href={`/items/${item.id}`}
                      className="btn btn-secondary text-xs text-center py-2.5 w-full hover:border-brand-purple/50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // Skeletal loader while items are initialized
              [1, 2, 3].map((n) => (
                <div key={n} className="card glass-card animate-pulse h-[350px] flex flex-col justify-between">
                  <div className="w-full h-[180px] bg-white/5 rounded-lg"></div>
                  <div className="w-2/3 h-5 bg-white/5 rounded mt-4"></div>
                  <div className="w-full h-4 bg-white/5 rounded mt-2"></div>
                  <div className="w-full h-8 bg-white/5 rounded mt-6"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Philosophy Stats Banner (4 Relevant Sections - Section 3) */}
      <section className="section border-t border-white/5 relative z-10 bg-gradient-to-r from-brand-purple/5 via-brand-teal/5 to-transparent backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-widest text-brand-purple uppercase mb-3 block">
                Brand Philosophy
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-md">
                We believe in fewer, better things.
              </h2>
              <p className="text-text-gray text-base leading-relaxed mb-6">
                In an era of mass-produced plastic, we stand for durability, tactical feedback, and organic warmth. Our production runs are small, keeping craftsmanship high and waste low.
              </p>
              <div className="flex items-center gap-8 mt-8">
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-title text-white">10k+</p>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">Desks Upgraded</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10"></div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-title text-white">99.4%</p>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">Happy Reviews</p>
                </div>
                <div className="w-[1px] h-10 bg-white/10"></div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold font-title text-white">10 Yr</p>
                  <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">Gear Warranty</p>
                </div>
              </div>
            </div>
            
            {/* Visual Callout Graphic */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-brand-purple/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop"
                alt="Workspace setup details"
                className="object-cover w-full h-full filter brightness-90 hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="badge badge-teal bg-bg-dark/80 backdrop-blur-md mb-2">Workspace Design</span>
                <p className="text-sm font-semibold text-white">Minimalist Desk Configuration, Vol. 04</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials (4 Relevant Sections - Section 4) */}
      <section className="section border-t border-white/5 relative z-10 bg-bg-dark/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Endorsed by Builders
            </h2>
            <p className="text-text-gray text-base">
              See what engineers, designers, and authors think after adding Aura Space accessories to their setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card glass-card flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm italic text-text-gray leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full border border-white/5 bg-bg-input"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-text-light">{t.author}</h4>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
