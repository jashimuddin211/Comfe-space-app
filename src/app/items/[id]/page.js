"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { getItemById, getItems } from "@/lib/itemsStore";
import { useToast } from "@/context/ToastContext";

export default function ItemDetails({ params }) {
  const { id } = use(params);
  const { showSuccess } = useToast();
  
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      Promise.resolve().then(() => {
        const foundItem = getItemById(id);
        setItem(foundItem);
        
        if (foundItem) {
          // Find related items (same category, exclude current)
          const allItems = getItems();
          const relatedItems = allItems
            .filter((i) => i.category === foundItem.category && i.id !== foundItem.id)
            .slice(0, 3);
          setRelated(relatedItems);
        }
        setLoading(false);
      });
    }
  }, [id]);

  const handleMockAction = () => {
    showSuccess(`Added ${item?.title} to your cart (Mock action).`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="spinner text-brand-blue"></div>
        <p className="text-xs text-text-gray animate-pulse font-mono uppercase tracking-widest">
          Reading Specs...
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-red-400 mx-auto mb-5">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-2">Item Not Found</h2>
        <p className="text-xs text-text-gray max-w-sm mx-auto mb-6">
          The requested product ID does not exist or has been removed from the batch logs.
        </p>
        <Link href="/items" className="btn btn-primary px-5 py-2 text-xs font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/items"
          className="group text-text-gray hover:text-white transition-colors duration-150 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
        >
          <svg
            className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Catalog
        </Link>
      </div>

      {/* Main product view grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
        {/* Left column: Image */}
        <div className="lg:col-span-7">
          <div className="aspect-[4/3] w-full rounded-sm overflow-hidden border border-white/10 shadow-lg relative bg-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-full filter brightness-95"
            />
          </div>
        </div>

        {/* Right column: Info & Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3.5 mb-3 font-mono text-[10px]">
              <span className="badge badge-teal">{item.category}</span>
              <span className="text-text-muted">Batch: {item.dateAdded}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase tracking-wide font-sans">
              {item.title}
            </h1>
            
            <div className="text-xl font-bold text-brand-blue mb-4 font-mono">
              ${item.price}
            </div>

            <p className="text-text-gray text-xs leading-relaxed mb-6">
              {item.fullDescription}
            </p>

            {/* Specifications Box */}
            {item.specs && item.specs.length > 0 && (
              <div className="bg-white/2 border border-white/5 rounded-sm p-4 mb-6">
                <h3 className="font-sans font-bold text-xs text-white uppercase tracking-wider mb-3">
                  Technical Specifications
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  {item.specs.map((spec, index) => {
                    const parts = spec.split(":");
                    if (parts.length > 1) {
                      return (
                        <li key={index} className="flex justify-between border-b border-white/5 pb-1.5 last:border-0 last:pb-0 text-[11px]">
                          <span className="text-text-muted">{parts[0].trim()}</span>
                          <span className="text-text-light font-semibold">{parts.slice(1).join(":").trim()}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={index} className="list-disc list-inside text-text-gray text-[11px]">
                        {spec}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={handleMockAction}
            className="w-full btn btn-primary py-3.5 font-bold text-xs uppercase tracking-wider shadow cursor-pointer"
          >
            Order Element
          </button>
        </div>
      </div>

      {/* Related items section */}
      {related.length > 0 && (
        <div className="border-t border-white/5 pt-12">
          <h2 className="text-lg md:text-xl font-bold text-white mb-8 uppercase tracking-wide">
            Related Workspace Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((relatedItem) => (
              <div key={relatedItem.id} className="card glass-card group flex flex-col h-full rounded p-4">
                <div className="aspect-[4/3] rounded-sm overflow-hidden relative mb-4 border border-white/10 bg-bg-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relatedItem.imageUrl}
                    alt={relatedItem.title}
                    className="object-cover w-full h-full filter brightness-95"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-sans group-hover:text-brand-blue transition-colors">
                      {relatedItem.title}
                    </h3>
                    <span className="font-semibold text-brand-blue text-xs font-mono">${relatedItem.price}</span>
                  </div>
                  <Link
                    href={`/items/${relatedItem.id}`}
                    className="btn btn-secondary text-xs text-center py-2 w-full mt-2 cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
