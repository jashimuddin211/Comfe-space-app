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
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Workspace <span className="text-gradient">Gear Collection</span>
        </h1>
        <p className="text-text-gray max-w-lg">
          High-performance tactical instruments and aesthetic furniture to perfect your workspace ergonomics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column: Filtering panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card glass-card p-6 sticky top-[100px]">
            <h3 className="font-title font-bold text-lg text-white mb-5 pb-3 border-b border-white/5 flex items-center justify-between">
              Filter Panel
              {(search || selectedCategory !== "All" || minPrice || maxPrice || sortBy !== "default") && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-brand-purple hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </h3>

            {/* Search Input */}
            <div className="form-group mb-5">
              <label className="form-label text-xs uppercase tracking-wider text-text-gray">Search</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Keyboard..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-input text-sm pl-9"
                />
                <svg
                  className="w-4 h-4 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2"
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
            <div className="form-group mb-5">
              <label className="form-label text-xs uppercase tracking-wider text-text-gray">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select text-sm cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-bg-card">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter Min/Max */}
            <div className="form-group mb-5">
              <label className="form-label text-xs uppercase tracking-wider text-text-gray">Price Range ($)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="form-input text-sm"
                  min="0"
                />
                <span className="text-text-muted text-sm">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="form-input text-sm"
                  min="0"
                />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="form-group mb-2">
              <label className="form-label text-xs uppercase tracking-wider text-text-gray">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select text-sm cursor-pointer"
              >
                <option value="default" className="bg-bg-card">Recently Added</option>
                <option value="price-asc" className="bg-bg-card">Price: Low to High</option>
                <option value="price-desc" className="bg-bg-card">Price: High to Low</option>
                <option value="newest" className="bg-bg-card">Newest Batches</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right column: Items grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Count & Info */}
          <div className="flex items-center justify-between text-sm text-text-gray px-1">
            <p>
              Showing <span className="font-semibold text-white">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "product" : "products"}
            </p>
            {selectedCategory !== "All" && (
              <span className="badge badge-purple">{selectedCategory}</span>
            )}
          </div>

          {/* Grid Layout */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="card glass-card flex flex-col h-full group animate-fade-in">
                  {/* Image wrapper */}
                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-5 border border-white/5 bg-bg-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="badge badge-purple bg-bg-dark/80 backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-md font-bold text-white font-title group-hover:text-brand-purple transition-colors">
                          {item.title}
                        </h3>
                        <span className="font-semibold text-brand-teal text-sm">${item.price}</span>
                      </div>
                      {/* Short Description */}
                      <p className="text-xs text-text-gray line-clamp-2 leading-relaxed mb-5">
                        {item.shortDescription}
                      </p>
                    </div>

                    {/* View Details Button */}
                    <Link
                      href={`/items/${item.id}`}
                      className="btn btn-secondary text-xs text-center py-2 w-full hover:border-brand-purple/50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="card glass-card p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No gear matches search criteria</h3>
              <p className="text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
                Adjust your filters, search term, or categories to discover other workspace accessories.
              </p>
              <button onClick={handleClearFilters} className="btn btn-primary px-6 py-2 text-xs">
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
          <div className="spinner text-brand-purple"></div>
          <p className="text-sm text-text-gray animate-pulse font-title">
            Loading Catalog Collection...
          </p>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
