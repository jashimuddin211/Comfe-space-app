"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Pass the current pathname so we can redirect back after successful login
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="spinner text-brand-blue"></div>
        <p className="text-sm text-text-gray animate-pulse font-title">
          Syncing session...
        </p>
      </div>
    );
  }

  // Prevent flash of content during redirect
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-text-muted">Redirecting to security gate...</p>
      </div>
    );
  }

  return <>{children}</>;
}
