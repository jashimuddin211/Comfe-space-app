"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getItems } from "@/lib/itemsStore";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // State
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Sync category state with query parameter if it changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Load items on mount
  useEffect(() => {
    setItems(getItems());
  }, []);

  // Filter Categories list
  const categories = ["All", "Keyboards", "Lighting", "Desk Organizers", "Accessories"];

  // Filter & Sort Logic
  const filteredItems = items
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      
      const priceVal = Number(item.price);
      const matchesMinPrice = minPrice === "" || priceVal >= Number(minPrice);
      const matchesMaxPrice = maxPrice === "" || priceVal <= Number(maxPrice);

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
      return 0; // default order
    });

  const handleClearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Title Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight uppercase">
          comfeSpace <span className="text-brand-blue">Catalog</span>
        </h1>
        <p className="text-text-gray text-xs max-w-lg">
          Precision-milled modular fixtures, monitor lighting bars, and leather organizers structured for deep desktop concentration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Filtering panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card glass-card p-5 sticky top-[100px] rounded">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-white mb-4 pb-2 border-b border-white/5 flex items-center justify-between">
              Filters
              {(search || selectedCategory !== "All" || minPrice || maxPrice || sortBy !== "default") && (
                <button
                  onClick={handleClearFilters}
                  className="text-[10px] font-bold text-brand-blue hover:underline cursor-pointer lowercase"
                >
                  [reset]
                </button>
              )}
            </h3>

            {/* Search Input */}
            <div className="form-group mb-4">
              <label className="form-label text-[10px]">Search keyword</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Keyboard..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input text-xs pl-8"
                />
                <svg
                  className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Select */}
            <div className="form-group mb-4">
              <label className="form-label text-[10px]">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select text-xs cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-bg-card text-xs">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter Min/Max */}
            <div className="form-group mb-4">
              <label className="form-label text-[10px]">Price Limits ($)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="form-input text-xs"
                  min="0"
                />
                <span className="text-text-muted text-xs font-mono">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="form-input text-xs"
                  min="0"
                />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="form-group mb-1">
              <label className="form-label text-[10px]">Sorting</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select text-xs cursor-pointer"
              >
                <option value="default" className="bg-bg-card text-xs">Default Logs</option>
                <option value="price-asc" className="bg-bg-card text-xs">Price: Low to High</option>
                <option value="price-desc" className="bg-bg-card text-xs">Price: High to Low</option>
                <option value="newest" className="bg-bg-card text-xs">Batch Release Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right column: Items grid */}
        <div className="lg:col-span-3 space-y-4">
          {/* Count & Info */}
          <div className="flex items-center justify-between text-xs text-text-gray px-1">
            <p className="font-mono">
              Found: <span className="font-bold text-white">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "unit" : "units"}
            </p>
            {selectedCategory !== "All" && (
              <span className="badge badge-teal">{selectedCategory}</span>
            )}
          </div>

          {/* Grid Layout */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="card glass-card flex flex-col h-full group p-4 rounded animate-fade-in">
                  {/* Image wrapper */}
                  <div className="aspect-[4/3] rounded-sm overflow-hidden relative mb-4 border border-white/10 bg-bg-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full filter brightness-95"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="badge badge-purple bg-bg-dark/90 text-[9px] px-1.5 py-0.5 border border-white/5">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans group-hover:text-brand-blue transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-semibold text-brand-blue text-xs font-mono">${item.price}</span>
                      </div>
                      {/* Short Description */}
                      <p className="text-xs text-text-gray line-clamp-2 leading-relaxed mb-4">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/items/${item.id}`}
                      className="btn btn-secondary text-xs text-center py-2 w-full cursor-pointer"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="card glass-card p-12 text-center flex flex-col items-center justify-center min-h-[300px] rounded">
              <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-text-muted mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2">No matching products found</h3>
              <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
                Adjust search queries or price limit inputs to find other workspace elements.
              </p>
              <button onClick={handleClearFilters} className="btn btn-primary px-5 py-2 text-xs font-bold cursor-pointer">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Items() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="spinner text-brand-blue"></div>
          <p className="text-xs text-text-gray animate-pulse font-mono uppercase tracking-widest">
            Fetching Catalog...
          </p>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
