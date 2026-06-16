"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getItems } from "@/lib/itemsStore";

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    // Load first 3 items as featured products
    Promise.resolve().then(() => {
      const items = getItems();
      setFeaturedItems(items.slice(0, 3));
    });
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Functional Ergonomics",
      description: "Dimensions and angles designed to support anatomical comfort and reduce physical strain during long sessions."
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      title: "Industrial Grade Materials",
      description: "Precision-milled anodized aluminum, American Walnut, and cork backing selected for structural rigidity and wear resistance."
    },
    {
      icon: (
        <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: "Modular Utility",
      description: "Modular components, hot-swappable mounts, and customizable configurations designed to adapt to your workspace specs."
    }
  ];

  const testimonials = [
    {
      quote: "comfeSpace tools completely redesigned my workflow. The build quality of the walnut desk shelf and keycaps is exceptionally solid.",
      author: "Sarah Jenkins",
      role: "Software Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      quote: "No fluff, just highly rigid, functional gear. The monitor light bar eliminates glare and the wool desk mat provides clean feedback.",
      author: "Marcus Chen",
      role: "Hardware Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    },
    {
      quote: "The geometric precision of the organizers fits my technical setup perfectly. Excellent attention to structural materials.",
      author: "Elena Rostova",
      role: "Infrastructure Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    }
  ];

  return (
    <div className="relative overflow-hidden w-full bg-bg-dark">
      {/* 2. Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-8 pb-16 md:py-24">
        <div className="container mx-auto px-6 text-center z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-bg-card border border-white/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-brand-blue">
              Batch 04 Active Release
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 max-w-4xl mx-auto leading-tight text-white">
            Workspace Tools Engineered for Focus
          </h1>
          <p className="text-sm md:text-base text-text-gray max-w-xl mx-auto mb-8 leading-relaxed">
            Minimalist and geometric office organizers, lighting tools, and customizable mechanical keypads designed to structure your desk for maximum productivity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/items" className="btn btn-primary px-6 py-2.5 text-xs font-semibold w-full sm:w-auto">
              View Catalog
            </Link>
            <Link href="/about" className="btn btn-secondary px-6 py-2.5 text-xs font-semibold w-full sm:w-auto">
              Philosophy Log
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Features Section (4 Relevant Sections - Section 1) */}
      <section id="features" className="py-16 border-t border-white/5 bg-bg-dark">
        <div className="container mx-auto px-6">
          <div className="text-left max-w-2xl mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wide font-sans text-white">
              Specifications & Engineering
            </h2>
            <p className="text-text-gray text-xs leading-relaxed">
              Workspace equipment built on mechanical rigidity, material durability, and modular utility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="card glass-card p-6 rounded"
              >
                <div className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wider text-white">{feature.title}</h3>
                <p className="text-xs text-text-gray leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products (4 Relevant Sections - Section 2) */}
      <section className="py-16 border-t border-white/5 bg-bg-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wide text-white">
                Featured Gear
              </h2>
              <p className="text-text-gray text-xs">
                A selection of modular desk elements available in the current batch.
              </p>
            </div>
            <Link
              href="/items"
              className="group text-brand-blue font-bold text-xs inline-flex items-center gap-1.5 hover:text-brand-blue-hover transition-colors"
            >
              View Catalog
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredItems.length > 0 ? (
              featuredItems.map((item) => (
                <div key={item.id} className="card glass-card flex flex-col h-full group p-4 rounded">
                  {/* Image Container */}
                  <div className="aspect-[4/3] rounded-sm overflow-hidden relative mb-4 border border-white/15 bg-bg-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full filter brightness-95"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-purple bg-bg-dark/90 text-[9px] px-1.5 py-0.5">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans group-hover:text-brand-blue transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-semibold text-brand-blue text-xs font-mono">${item.price}</span>
                    </div>
                    <p className="text-xs text-text-gray line-clamp-2 mb-4 flex-grow leading-relaxed">
                      {item.shortDescription}
                    </p>
                    <Link
                      href={`/items/${item.id}`}
                      className="btn btn-secondary text-xs text-center py-2 w-full cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              // Skeletal loader while items are initialized
              [1, 2, 3].map((n) => (
                <div key={n} className="card glass-card animate-pulse h-[320px] flex flex-col justify-between rounded">
                  <div className="w-full h-[160px] bg-white/5 rounded-sm"></div>
                  <div className="w-2/3 h-4 bg-white/5 rounded mt-3"></div>
                  <div className="w-full h-3 bg-white/5 rounded mt-2"></div>
                  <div className="w-full h-8 bg-white/5 rounded mt-4"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 5. Philosophy Stats Banner (4 Relevant Sections - Section 3) */}
      <section className="py-16 border-t border-white/5 bg-bg-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-blue uppercase mb-2 block">
                Design Objective
              </span>
              <h2 className="text-xl md:text-3xl font-bold mb-4 uppercase tracking-wide text-white max-w-md">
                Geometric discipline. High durability.
              </h2>
              <p className="text-text-gray text-xs leading-relaxed mb-6">
                Our tools are crafted in limited production lots to ensure strict inspection standards. By avoiding complex geometries and prioritizing raw metal, wood, and wool, we aim to design durable fixtures for your workspace.
              </p>
              <div className="flex items-center gap-6 mt-6">
                <div>
                  <p className="text-2xl font-bold font-mono text-white">10k+</p>
                  <p className="text-[9px] uppercase tracking-wider text-text-muted mt-0.5">Lot Shipments</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div>
                  <p className="text-2xl font-bold font-mono text-white">99.4%</p>
                  <p className="text-[9px] uppercase tracking-wider text-text-muted mt-0.5">QC Pass Rate</p>
                </div>
                <div className="w-[1px] h-8 bg-white/10"></div>
                <div>
                  <p className="text-2xl font-bold font-mono text-white">10 Yr</p>
                  <p className="text-[9px] uppercase tracking-wider text-text-muted mt-0.5">Part Warranty</p>
                </div>
              </div>
            </div>
            
            {/* Visual Callout Graphic */}
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/15 bg-bg-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop"
                alt="Workspace setup details"
                className="object-cover w-full h-full filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="badge badge-teal bg-bg-dark/95 text-[9px] mb-1">Configuration</span>
                <p className="text-xs font-semibold text-white font-mono">comfe Desk Log Vol. 04</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials (4 Relevant Sections - Section 4) */}
      <section className="py-16 border-t border-white/5 bg-bg-dark">
        <div className="container mx-auto px-6">
          <div className="text-left max-w-2xl mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-2 uppercase tracking-wide text-white">
              Developer & Creator Reviews
            </h2>
            <p className="text-text-gray text-xs">
              Verified feedback from users incorporating comfeSpace configurations into daily development setups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card glass-card flex flex-col justify-between rounded p-5">
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3 text-brand-blue">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs italic text-text-gray leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-2.5 border-t border-white/5 pt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-7 h-7 rounded bg-bg-input border border-white/10"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-text-light">{t.author}</h4>
                    <p className="text-[10px] text-text-muted">{t.role}</p>
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
