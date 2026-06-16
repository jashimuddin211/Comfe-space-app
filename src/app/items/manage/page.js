"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getItems, deleteItem } from "@/lib/itemsStore";
import { useToast } from "@/context/ToastContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function ManageItemsContent() {
  const { showSuccess, showError } = useToast();
  const [items, setItems] = useState([]);

  useEffect(() => {
    Promise.resolve().then(() => {
      setItems(getItems());
    });
  }, []);

  const handleDelete = (id, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    try {
      const result = deleteItem(id);
      if (result) {
        showSuccess(`Deleted "${title}" successfully.`);
        // Refresh local state list
        setItems(getItems());
      } else {
        showError("Failed to delete the product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      showError("An unexpected error occurred while deleting.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2 font-sans uppercase">
            Manage <span className="text-brand-blue">Products</span>
          </h1>
          <p className="text-xs text-text-gray">
            Inspect, audit, or delete workspace accessories registered in your local comfeSpace batch.
          </p>
        </div>
        <Link href="/items/add" className="btn btn-primary text-xs flex items-center gap-1.5 font-bold cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {items.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block card glass-card overflow-hidden p-0 border border-white/5 rounded">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2 text-text-muted text-[10px] uppercase tracking-wider font-mono">
                    <th className="py-3 px-6 font-semibold">Accessory</th>
                    <th className="py-3 px-6 font-semibold">Category</th>
                    <th className="py-3 px-6 font-semibold">Price</th>
                    <th className="py-3 px-6 font-semibold">Release Date</th>
                    <th className="py-3 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs text-text-gray">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/2 transition-colors">
                      {/* Product details */}
                      <td className="py-3 px-6 font-medium text-white flex items-center gap-3">
                        <div className="w-10 h-7 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-bg-dark">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-semibold text-text-light font-sans max-w-xs truncate uppercase tracking-wider text-[11px]">
                          {item.title}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-6">
                        <span className="badge badge-purple">{item.category}</span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-6 font-semibold text-brand-blue font-mono">
                        ${item.price}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-6 text-[10px] text-text-muted font-mono">
                        {item.dateAdded}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-6 text-right space-x-2">
                        <Link
                          href={`/items/${item.id}`}
                          className="btn btn-outline py-1 px-2.5 text-[10px] font-semibold uppercase tracking-wider"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="btn btn-secondary border-red-500/10 text-red-400 hover:bg-red-500/10 hover:text-red-300 py-1 px-2.5 text-[10px] font-semibold uppercase tracking-wider cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Grid/List View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {items.map((item) => (
              <div key={item.id} className="card glass-card p-4 flex flex-col gap-3 rounded">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-10 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-bg-dark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider truncate">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge badge-purple text-[9px] px-1.5 py-0.5">{item.category}</span>
                      <span className="text-brand-blue font-semibold text-xs font-mono">${item.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-[10px] border-t border-white/5 pt-2.5">
                  <span className="text-text-muted font-mono">Added: {item.dateAdded}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/items/${item.id}`}
                      className="btn btn-secondary py-1 px-2.5 text-[10px]"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="btn btn-danger py-1 px-2.5 text-[10px]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Empty state */
        <div className="card glass-card p-12 text-center flex flex-col items-center justify-center min-h-[300px] rounded">
          <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-text-muted mb-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-2">No Accessories Logged</h2>
          <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
            Your catalog is currently empty. Start uploading workspace accessories to populate the database.
          </p>
          <Link href="/items/add" className="btn btn-primary px-5 py-2 text-xs font-bold">
            Add Your First Accessory
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ManageItems() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
