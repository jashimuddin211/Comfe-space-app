import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Title */}
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 font-title">
          Designed for <span className="text-gradient">High-Bandwidth Focus</span>
        </h1>
        <p className="text-text-gray text-lg md:text-xl leading-relaxed">
          At Aura Space, we believe your physical workspace is a direct projection of your mental clarity. Our goal is to craft premium, tactile instruments that turn daily desktop environments into beautiful zones of deep cognitive work.
        </p>
      </div>

      {/* Grid splits image and text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=800&auto=format&fit=crop"
            alt="Workspace setup close-up"
            className="object-cover w-full h-full filter brightness-90"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-title">
            The Craftsmanship Principle
          </h2>
          <p className="text-text-gray text-sm md:text-base leading-relaxed">
            Every keyboard casing, desk mat, and ambient lighting piece is designed from the ground up. We select materials based on their longevity, weight, tactility, and visual warmth. American Walnut, top-grain leather, solid anodized aluminum, and merino wool felt form the foundation of our design palette.
          </p>
          <p className="text-text-gray text-sm md:text-base leading-relaxed">
            By avoiding mass-market plastic injections and concentrating on modular, repairable structures, we aim to build desktop items that age gracefully and accompany you through decades of career milestones.
          </p>
        </div>
      </div>

      {/* Core Values grid */}
      <div className="border-t border-white/5 pt-16 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight font-title">
          Our Workspace Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card glass-card">
            <h3 className="text-lg font-bold text-white font-title mb-3">Tactility & Feedback</h3>
            <p className="text-xs text-text-gray leading-relaxed">
              Every press, turn, and touch should yield pleasant, precise tactile response. Satisfying mechanical feedback helps define rhythm and enhances concentration during intensive workflows.
            </p>
          </div>
          <div className="card glass-card">
            <h3 className="text-lg font-bold text-white font-title mb-3">Visual Tranquility</h3>
            <p className="text-xs text-text-gray leading-relaxed">
              Mess and clutter trigger subconscious cognitive load. We design integrated layouts, hidden routing paths, and modular organizers to create absolute desktop cleanliness.
            </p>
          </div>
          <div className="card glass-card">
            <h3 className="text-lg font-bold text-white font-title mb-3">Modular Lifespan</h3>
            <p className="text-xs text-text-gray leading-relaxed">
              Things should be built to last. Our hot-swappable mechanical keyboards and aluminum brackets are designed for quick upgrades, clean maintenance, and hardware customization.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="card glass-card text-center p-10 md:p-14 bg-gradient-to-r from-brand-purple/10 to-transparent flex flex-col items-center max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">Ready to elevate your desk?</h2>
        <p className="text-text-gray text-sm md:text-base max-w-lg mb-8 leading-relaxed">
          Discover our active batches of desk accessories and find the missing piece in your home workspace setup.
        </p>
        <Link href="/items" className="btn btn-primary px-8 py-3.5 text-sm font-medium">
          Shop Workspace Gear
        </Link>
      </div>
    </div>
  );
}
