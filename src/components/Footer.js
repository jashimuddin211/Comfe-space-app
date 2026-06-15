"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

export default function Footer() {
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      showError("Please enter a valid email address.");
      return;
    }
    showSuccess("Subscribed successfully! Thank you for joining comfeSpace.");
    setEmail("");
  };

  return (
    <footer className="border-t border-white/5 bg-bg-dark pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-brand-blue flex items-center justify-center font-mono font-bold text-lg text-bg-dark">
                C
              </div>
              <span className="font-mono font-bold text-lg tracking-tighter text-white">
                comfe<span className="text-brand-blue">Space</span>
              </span>
            </Link>
            <p className="text-xs text-text-gray leading-relaxed max-w-xs">
              Minimalist, high-performance workspace tools and aesthetic organizers engineered to support intense focus and daily productivity.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-1">
              <a href="#" className="text-text-muted hover:text-brand-blue transition-colors duration-150" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-brand-blue transition-colors duration-150" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="text-text-muted hover:text-brand-blue transition-colors duration-150" aria-label="Dribbble">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.14 5.02c.9 1.25 1.39 2.75 1.39 4.34 0 .3-.02.6-.06.89-.03-.01-1.63-.5-3.34-.34-.14-.34-.29-.68-.45-1.02 1.84-.73 2.4-1.92 2.46-2.05-.08-.07-1.09-.94-2.83-.55-.66-.46-1.39-.88-2.18-1.23.06-.11.12-.22.18-.33.24-.46.46-.94.65-1.42 2.5.9 3.66 2.36 3.78 2.51l.01.01zm-5.69-3.8c-.21.5-.45 1.02-.73 1.53-.05.1-.11.2-.17.3-1.69-.53-3.54-.54-5.26-.06.18-.41.42-.78.7-1.12 1.54-1.24 3.55-1.67 5.46-.65zm-6.9 2.92a7.87 7.87 0 013.91-2.09c-.21.46-.38.93-.53 1.4-.41 1.35-.6 2.68-.61 3.93-1.61-.31-3.21-.14-3.41-.11.02-1.09.25-2.13.64-3.13zm-.12 4.96c.26-.03 1.94-.2 3.69.17.02.43.02.87.01 1.31-.03 1.63-.26 3.23-.66 4.74-1.89-.92-2.73-2.58-2.82-2.76a7.99 7.99 0 01-.22-3.46zm6.39 6.78c.36-1.37.58-2.81.63-4.27 1.84.09 3.56.76 4.67 1.49-.61 1.25-1.61 2.27-2.82 2.92a7.9 7.9 0 01-2.48-.14zm4.84-4.81c-.93-.68-2.46-1.29-4.14-1.4.01-.39.01-.78-.01-1.16 0-.29-.02-.59-.04-.88.75.31 1.45.69 2.08 1.12.82.56 1.44 1.19 1.77 1.57.12.23.23.48.34.75z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Department Column */}
          <div>
            <h4 className="font-sans font-bold text-xs text-text-light uppercase tracking-wider mb-4">
              Catalog
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-gray">
              <li>
                <Link href="/items?category=Keyboards" className="hover:text-brand-blue transition-colors duration-150">
                  Mechanical Keyboards
                </Link>
              </li>
              <li>
                <Link href="/items?category=Lighting" className="hover:text-brand-blue transition-colors duration-150">
                  Desk & Monitor Lighting
                </Link>
              </li>
              <li>
                <Link href="/items?category=Desk Organizers" className="hover:text-brand-blue transition-colors duration-150">
                  Desk Mats & Risers
                </Link>
              </li>
              <li>
                <Link href="/items?category=Accessories" className="hover:text-brand-blue transition-colors duration-150">
                  Workspace Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-sans font-bold text-xs text-text-light uppercase tracking-wider mb-4">
              comfeSpace
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-text-gray">
              <li>
                <Link href="/about" className="hover:text-brand-blue transition-colors duration-150">
                  About Brand
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-brand-blue transition-colors duration-150">
                  Workspace Journal
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-blue transition-colors duration-150">
                  Warranty & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-blue transition-colors duration-150">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold text-xs text-text-light uppercase tracking-wider mb-1">
              Newsletter
            </h4>
            <p className="text-xs text-text-gray leading-normal">
              Subscribe to get notified about new production batches and layout logs.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mt-1 w-full">
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input text-xs py-2 px-3 border border-white/5 bg-bg-input text-text-light rounded-sm focus:outline-none focus:border-brand-blue w-full"
              />
              <button
                type="submit"
                className="btn btn-primary text-xs py-2 px-4 rounded-sm font-semibold cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-text-muted gap-4">
          <p>&copy; {new Date().getFullYear()} comfeSpace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-text-gray transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-gray transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
