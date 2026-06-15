import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Title */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-sans uppercase">
          comfeSpace <span className="text-brand-blue">Design Log</span>
        </h1>
        <p className="text-text-gray text-sm md:text-base leading-relaxed">
          comfeSpace designs and manufactures physical equipment configurations designed for deep developer focus. We prioritize geometric discipline, material performance, and modularity to help optimize workspaces.
        </p>
      </div>

      {/* Grid splits image and text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="aspect-[16/10] w-full rounded-sm overflow-hidden border border-white/10 bg-bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=800&auto=format&fit=crop"
            alt="Workspace setup close-up"
            className="object-cover w-full h-full filter brightness-95"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider">
            Material Rigidity & Utility
          </h2>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed">
            Every keyboard frame, monitor light bar, and desktop tray is engineered to support professional daily routines. We select materials based on their weight, longevity, thermal resistance, and acoustic properties. Anodized aluminum, American Walnut, natural wool, and high-density cork form the foundation of our materials catalog.
          </p>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed">
            By avoiding complex visual decorations and focusing on clean geometry and modular replacement paths, we make workspace accessories that serve you through decades of career milestones.
          </p>
        </div>
      </div>

      {/* Core Values grid */}
      <div className="border-t border-white/5 pt-12 mb-12">
        <h2 className="text-lg md:text-xl font-bold text-white mb-8 uppercase tracking-wide">
          Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card glass-card rounded p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Mechanical Feedback</h3>
            <p className="text-[11px] text-text-gray leading-relaxed">
              Every key switch, knob, and mounting rail is designed to yield clean, precise tactile response. Mechanical feedback establishes a steady rhythm and supports focus during active programming sessions.
            </p>
          </div>
          <div className="card glass-card rounded p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Visual Discipline</h3>
            <p className="text-[11px] text-text-gray leading-relaxed">
              Visual clutter triggers cognitive load. We configure integrated cable routing, structured desktop layers, and low-profile desk shelves to maximize clear workspace area.
            </p>
          </div>
          <div className="card glass-card rounded p-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Modular Upgrades</h3>
            <p className="text-[11px] text-text-gray leading-relaxed">
              Fixtures should adapt. Our mechanical keyboard casings and desk mounts are constructed for quick assembly, component replacement, and custom expansion configurations.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="card glass-card text-center p-8 md:p-10 bg-bg-card flex flex-col items-center max-w-2xl mx-auto mt-16 rounded">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide">Structure Your Desk</h2>
        <p className="text-text-gray text-xs max-w-md mb-6 leading-relaxed">
          Inspect our catalog of industrial workspace organizers, keyboards, and ambient light bars.
        </p>
        <Link href="/items" className="btn btn-primary px-6 py-2.5 text-xs font-semibold">
          View Collection
        </Link>
      </div>
    </div>
  );
}
