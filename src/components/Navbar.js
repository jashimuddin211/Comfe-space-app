"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess("Successfully signed out.");
    } catch (err) {
      showError("Failed to sign out. Please try again.");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/items" },
    { name: "About", path: "/about" },
    { name: "Journal", path: "/journal" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] z-50 glass-navbar flex items-center transition-all duration-200">
      <div className="container mx-auto flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-brand-blue flex items-center justify-center font-mono font-bold text-lg text-bg-dark transition-transform duration-300 group-hover:scale-102">
            C
          </div>
          <span className="font-mono font-bold text-lg tracking-tighter text-white">
            comfe<span className="text-brand-blue">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation Routes */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-150 ${
                pathname === link.path
                  ? "text-brand-blue"
                  : "text-text-gray hover:text-text-light"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth State / Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 p-1 rounded hover:bg-white/5 transition-all duration-150 border border-white/5 cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-7 h-7 rounded-sm object-cover border border-white/10"
                />
                <span className="text-xs font-semibold pr-1 text-text-light max-w-[100px] truncate">
                  {user.displayName}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-text-gray transition-transform duration-150 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu glass-dropdown font-sans rounded">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name font-sans text-xs uppercase tracking-wider text-text-light">{user.displayName}</p>
                    <p className="dropdown-user-email font-mono text-[10px] text-text-muted">{user.email}</p>
                  </div>
                  <Link href="/items/add" className="dropdown-item text-xs font-medium">
                    <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                  </Link>
                  <Link href="/items/manage" className="dropdown-item text-xs font-medium">
                    <svg className="w-3.5 h-3.5 text-text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Products
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item w-full text-left border-t border-white/5 mt-1 pt-2 text-red-400 hover:text-red-300 text-xs font-medium cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-xs font-semibold uppercase tracking-wider text-text-gray hover:text-text-light transition-colors duration-150 px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/login?mode=register"
                className="btn btn-primary px-4 py-2 font-semibold text-xs"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-gray hover:text-text-light focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-bg-dark border-b border-white/5 py-5 px-6 flex flex-col gap-5 md:hidden animate-fade-in backdrop-blur-lg">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-semibold uppercase tracking-wider py-1 transition-colors ${
                  pathname === link.path ? "text-brand-blue" : "text-text-gray"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/5 pt-5 flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-9 h-9 rounded border border-white/10"
                  />
                  <div>
                    <p className="font-semibold text-text-light text-xs uppercase tracking-wider">{user.displayName}</p>
                    <p className="text-[10px] text-text-muted font-mono">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-2 gap-2 mt-1">
                  <Link href="/items/add" className="btn btn-secondary text-xs py-2 px-3 text-center">
                    Add Product
                  </Link>
                  <Link href="/items/manage" className="btn btn-secondary text-xs py-2 px-3 text-center">
                    Manage Products
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline border-red-500/20 text-red-400 text-xs py-2 mt-1 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="btn btn-secondary text-center py-2 text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/login?mode=register"
                  className="btn btn-primary text-center py-2 text-xs font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
