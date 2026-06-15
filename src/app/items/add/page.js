"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/itemsStore";
import { useToast } from "@/context/ToastContext";
import ProtectedRoute from "@/components/ProtectedRoute";

function AddItemForm() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Keyboards");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [specsText, setSpecsText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Form Validation
  const validate = () => {
    const tempErrors = {};
    if (!title.trim()) tempErrors.title = "Accessory title is required.";
    if (!price || Number(price) <= 0) tempErrors.price = "Please specify a positive price.";
    if (!shortDesc.trim()) tempErrors.shortDesc = "Short description is required.";
    if (shortDesc.length > 100) tempErrors.shortDesc = "Must be under 100 characters.";
    if (!fullDesc.trim()) tempErrors.fullDesc = "Full description is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showError("Please correct the validation errors in the form.");
      return;
    }

    setSubmitting(true);
    try {
      // Parse specifications from newline-separated text
      const specs = specsText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      // Fallback image if empty
      const finalImageUrl =
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?q=80&w=600&auto=format&fit=crop";

      const newItem = {
        title,
        category,
        price: Number(price),
        shortDescription: shortDesc,
        fullDescription: fullDesc,
        specs,
        imageUrl: finalImageUrl
      };

      const result = addItem(newItem);
      if (result) {
        showSuccess(`Added ${title} successfully!`);
        router.push("/items");
      } else {
        showError("Failed to add product. Please try again.");
      }
    } catch (err) {
      console.error(err);
      showError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ["Keyboards", "Lighting", "Desk Organizers", "Accessories"];

  return (
    <div className="container mx-auto px-6 py-12 flex justify-center">
      <div className="card glass-card w-full max-w-2xl p-8 relative rounded">
        <h1 className="text-xl md:text-2xl font-extrabold text-white mb-1.5 uppercase tracking-wide">
          Add New <span className="text-brand-blue">Accessory</span>
        </h1>
        <p className="text-[11px] text-text-gray mb-6 leading-relaxed">
          Log details for a custom comfeSpace workspace accessory. Specifications will be parsed and listed in the catalog.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-2 gap-4">
            {/* Title */}
            <div className="form-group">
              <label className="form-label text-[10px]">Accessory Title</label>
              <input
                type="text"
                placeholder="e.g. comfe Numpad Layout"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={submitting}
                className={`form-input text-xs ${errors.title ? "border-red-500/50 focus:border-red-500/50" : ""}`}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label text-[10px]">Category Group</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={submitting}
                className="form-select text-xs cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-bg-card">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-2 gap-4">
            {/* Price */}
            <div className="form-group">
              <label className="form-label text-[10px]">Unit Price ($)</label>
              <input
                type="number"
                placeholder="e.g. 89"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={submitting}
                min="0"
                step="0.01"
                className={`form-input text-xs ${errors.price ? "border-red-500/50 focus:border-red-500/50" : ""}`}
              />
              {errors.price && <p className="form-error">{errors.price}</p>}
            </div>

            {/* Image URL */}
            <div className="form-group">
              <label className="form-label text-[10px]">Image URL (Optional)</label>
              <input
                type="url"
                placeholder="e.g. https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                disabled={submitting}
                className="form-input text-xs"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="form-label text-[10px]">Short Summary (Catalog view)</label>
            <input
              type="text"
              placeholder="e.g. A gorgeous matching mechanical numpad crafted in brass and walnut."
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              disabled={submitting}
              className={`form-input text-xs ${errors.shortDesc ? "border-red-500/50 focus:border-red-500/50" : ""}`}
            />
            <div className="flex justify-between mt-0.5 text-[9px] text-text-muted font-mono">
              <span>Short description for listing cards.</span>
              <span>{shortDesc.length}/100</span>
            </div>
            {errors.shortDesc && <p className="form-error">{errors.shortDesc}</p>}
          </div>

          {/* Full Description */}
          <div className="form-group">
            <label className="form-label text-[10px]">Detailed description</label>
            <textarea
              placeholder="Provide an in-depth story, detailing the ergonomic benefits, materials, construction, and specifications of this workspace accessory."
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              disabled={submitting}
              className={`form-textarea text-xs ${errors.fullDesc ? "border-red-500/50 focus:border-red-500/50" : ""}`}
            />
            {errors.fullDesc && <p className="form-error">{errors.fullDesc}</p>}
          </div>

          {/* Specs List */}
          <div className="form-group">
            <label className="form-label text-[10px]">Specifications (One key-value pair per line)</label>
            <textarea
              placeholder="e.g.&#10;Key Switches: comfe Linear Silent&#10;Body Casing: Brass & Oak&#10;Weight: 450g&#10;Cable: Braided 1.5m USB-C"
              value={specsText}
              onChange={(e) => setSpecsText(e.target.value)}
              disabled={submitting}
              className="form-textarea h-[100px] font-mono text-[11px]"
            />
            <p className="text-[9px] text-text-muted mt-0.5 font-mono">
              Enter details using the **Key: Value** format on individual lines.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={() => router.push("/items")}
              disabled={submitting}
              className="btn btn-secondary px-5 py-2 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary px-6 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="spinner text-bg-dark w-3.5 h-3.5"></span>
                  Uploading...
                </>
              ) : (
                "Add Accessory"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddItem() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}
