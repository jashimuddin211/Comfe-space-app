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
    }
  }, [id]);

  const handleMockAction = () => {
    showSuccess(`Added ${item?.title} to your cart (Mock action).`);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="spinner text-brand-purple"></div>
        <p className="text-sm text-text-gray animate-pulse font-title">
          Loading Gear Details...
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-400 mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Product Not Found</h2>
        <p className="text-text-gray max-w-sm mx-auto mb-8">
          The accessory you are looking for does not exist in our catalog database or has been removed.
        </p>
        <Link href="/items" className="btn btn-primary px-6 py-2.5 text-sm">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/items"
          className="group text-text-gray hover:text-white transition-colors duration-200 inline-flex items-center gap-2 text-sm font-medium"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Left column: Image */}
        <div className="lg:col-span-7">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative bg-bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right column: Info & Specs */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="badge badge-purple">{item.category}</span>
              <span className="text-xs text-text-muted">Released: {item.dateAdded}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight font-title">
              {item.title}
            </h1>
            
            <div className="text-2xl font-semibold text-brand-teal mb-6">
              ${item.price}
            </div>

            <p className="text-text-gray text-base leading-relaxed mb-6">
              {item.fullDescription}
            </p>

            {/* Specifications Box */}
            {item.specs && item.specs.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
                <h3 className="font-title font-bold text-sm text-white uppercase tracking-wider mb-3.5">
                  Product Specifications
                </h3>
                <ul className="space-y-2.5 text-xs text-text-gray">
                  {item.specs.map((spec, index) => {
                    const parts = spec.split(":");
                    if (parts.length > 1) {
                      return (
                        <li key={index} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <span className="text-text-muted font-medium">{parts[0].trim()}</span>
                          <span className="text-white font-semibold">{parts.slice(1).join(":").trim()}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={index} className="list-disc list-inside text-text-gray">
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
            className="btn btn-primary w-full py-4 font-semibold text-md shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/35 transition-all duration-300"
          >
            Purchase Gear
          </button>
        </div>
      </div>

      {/* Related items section */}
      {related.length > 0 && (
        <div className="border-t border-white/5 pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 tracking-tight text-left">
            Related Workspace Accessories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((relatedItem) => (
              <div key={relatedItem.id} className="card glass-card group flex flex-col h-full">
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-5 border border-white/5 bg-bg-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relatedItem.imageUrl}
                    alt={relatedItem.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white font-title group-hover:text-brand-purple transition-colors">
                      {relatedItem.title}
                    </h3>
                    <span className="font-semibold text-brand-teal text-xs">${relatedItem.price}</span>
                  </div>
                  <Link
                    href={`/items/${relatedItem.id}`}
                    className="btn btn-secondary text-xs text-center py-2 w-full mt-3"
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
