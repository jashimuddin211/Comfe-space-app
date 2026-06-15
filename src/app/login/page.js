"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Link from "next/link";

function LoginContent() {
  const { user, login, register, loginWithGoogle, isMock } = useAuth();
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect target
  const redirectUrl = searchParams.get("redirect") || "/";
  // Initial mode from query params
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";

  // Form State
  const [mode, setMode] = useState(initialMode);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync mode if query params change
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  // Inline Validation
  const validateForm = () => {
    const tempErrors = {};
    
    if (mode === "register" && !displayName.trim()) {
      tempErrors.displayName = "Full name is required.";
    }
    
    if (!email) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    if (!password) {
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
        showSuccess("Welcome back to Aura Space!");
      } else {
        await register(email, password, displayName);
        showSuccess("Account created! Welcome to Aura Space.");
      }
    } catch (err) {
      console.error(err);
      let errMsg = "Authentication failed. Please check your credentials.";
      if (err.code === "auth/email-already-in-use") {
        errMsg = "This email is already registered. Please sign in instead.";
      } else if (err.code === "auth/invalid-credential" || err.message.includes("wrong-password")) {
        errMsg = "Incorrect email or password. Please try again.";
      } else if (err.code === "auth/user-not-found") {
        errMsg = "No account found with this email. Please register first.";
      }
      showError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    try {
      await loginWithGoogle();
      showSuccess("Successfully authenticated via Google.");
    } catch (err) {
      console.error(err);
      showError("Google authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setErrors({});
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  return (
    <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[75vh]">
      <div className="card glass-card w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-teal flex items-center justify-center font-bold text-lg text-white shadow-md">
              A
            </div>
            <span className="font-title font-bold text-xl tracking-tight text-white">
              Aura<span className="text-brand-teal">Space</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-title text-white">
            {mode === "login" ? "Sign In to Your Space" : "Create Workspace Account"}
          </h2>
          <p className="text-xs text-text-gray mt-1.5">
            {mode === "login" ? "Access your curated collections and orders" : "Register to add and manage your workspace items"}
          </p>
        </div>

        {/* Mock Auth Mode Banner Indicator */}
        {isMock && (
          <div className="mb-6 p-3.5 rounded-lg bg-brand-teal/5 border border-brand-teal/20 text-left">
            <div className="flex items-start gap-2.5 text-brand-teal text-xs">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold uppercase tracking-wider mb-0.5">Mock Auth Mode Active</p>
                <p className="text-text-gray leading-normal">
                  Firebase configuration not found. You can register/login with **any** credentials. Passwords must be &ge; 6 characters.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name (Register Mode Only) */}
          {mode === "register" && (
            <div className="form-group">
              <label className="form-label text-xs uppercase tracking-wider text-text-gray">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={submitting}
                className={`form-input text-sm ${errors.displayName ? "border-red-500/50" : ""}`}
              />
              {errors.displayName && <p className="form-error">{errors.displayName}</p>}
            </div>
          )}

          {/* Email Input */}
          <div className="form-group">
            <label className="form-label text-xs uppercase tracking-wider text-text-gray">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className={`form-input text-sm ${errors.email ? "border-red-500/50" : ""}`}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label text-xs uppercase tracking-wider text-text-gray">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              className={`form-input text-sm ${errors.password ? "border-red-500/50" : ""}`}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full py-3 mt-2 font-medium flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="spinner text-white w-4 h-4"></span>
                Processing...
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-text-muted">Or</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Google Authentication */}
        <button
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="btn btn-secondary w-full py-2.5 font-medium flex items-center justify-center gap-2.5 border border-white/5 hover:border-white/15 text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.1.14-.99 3.01l3.07 2.38c1.8-1.66 2.97-4.11 2.97-7.22z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.07-2.38c-.9.6-2.03.96-3.86.96-3.74 0-6.9-2.52-8.03-5.91L1.14 16.92C3.12 21.06 7.4 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M3.97 13.76c-.29-.9-.45-1.85-.45-2.76s.16-1.86.45-2.76L1.14 5.92C.41 7.42 0 9.17 0 11s.41 3.58 1.14 5.08l2.83-2.32z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.4 0 3.12 2.94 1.14 7.08l2.83 2.32c1.13-3.39 4.29-5.9 8.03-5.9z"
            />
          </svg>
          {isMock ? "Continue as Google User" : "Continue with Google"}
        </button>

        {/* Toggler */}
        <div className="text-center mt-6">
          <button
            onClick={toggleMode}
            className="text-xs text-text-gray hover:text-brand-purple transition-colors cursor-pointer"
          >
            {mode === "login" ? (
              <>
                New to Aura Space? <span className="font-semibold underline">Register here</span>
              </>
            ) : (
              <>
                Already have an account? <span className="font-semibold underline">Sign in here</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <div className="spinner text-brand-purple"></div>
          <p className="text-sm text-text-gray animate-pulse font-title">
            Loading Security Gate...
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
