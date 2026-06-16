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
  const [showPassword, setShowPassword] = useState(false);
  
  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync mode if query params change
  useEffect(() => {
    Promise.resolve().then(() => {
      setMode(prev => prev !== initialMode ? initialMode : prev);
    });
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
        showSuccess("Welcome back to comfeSpace!");
      } else {
        await register(email, password, displayName);
        showSuccess("Account created! Welcome to comfeSpace.");
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
    setShowPassword(false);
  };

  return (
    <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[75vh]">
      <div className="glass-card w-full max-w-md rounded border border-white/10 bg-bg-card p-8 shadow-2xl relative overflow-hidden">
        
        {/* Title Header */}
        <div className="text-center mb-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-8 h-8 rounded bg-brand-blue flex items-center justify-center font-mono font-bold text-lg text-bg-dark transition-transform duration-300">
              C
            </div>
            <span className="font-mono font-bold text-lg tracking-tighter text-white">
              comfe<span className="text-brand-blue">Space</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold uppercase tracking-wide text-white leading-none">
            {mode === "login" ? "Sign In" : "Register"}
          </h2>
          <p className="text-[11px] text-text-gray mt-2 leading-relaxed">
            {mode === "login" 
              ? "Access your logged configuration batches and tools" 
              : "Register to custom log and manage workspace elements"}
          </p>
        </div>

        {/* Mock Auth Mode Banner Indicator */}
        {isMock && (
          <div className="mb-6 p-4 rounded-sm bg-brand-blue/5 border border-brand-blue/15 text-left relative z-10 animate-fade-in font-mono">
            <div className="flex items-start gap-3 text-brand-blue text-[10px]">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold uppercase tracking-wider mb-0.5">Mock Auth Active</p>
                <p className="text-text-gray leading-normal">
                  Local fallback mode. Log in with **any** credentials. Passwords &ge; 6 characters.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Full Name (Register Mode Only) */}
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-gray pl-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={submitting}
                  className={`w-full bg-bg-input border border-white/10 focus:border-brand-blue text-text-light py-2 pl-9 pr-3 rounded text-xs transition-all outline-none ${
                    errors.displayName ? "border-red-500/50 focus:border-red-500/50" : ""
                  }`}
                />
                <svg className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-h-[16px] pl-1">
                {errors.displayName && <p className="text-[10px] font-medium text-red-400 font-mono">{errors.displayName}</p>}
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-gray pl-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className={`w-full bg-bg-input border border-white/10 focus:border-brand-blue text-text-light py-2 pl-9 pr-3 rounded text-xs transition-all outline-none ${
                  errors.email ? "border-red-500/50 focus:border-red-500/50" : ""
                }`}
              />
              <svg className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-h-[16px] pl-1">
              {errors.email && <p className="text-[10px] font-medium text-red-400 font-mono">{errors.email}</p>}
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-text-gray pl-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                className={`w-full bg-bg-input border border-white/10 focus:border-brand-blue text-text-light py-2 pl-9 pr-9 rounded text-xs transition-all outline-none ${
                  errors.password ? "border-red-500/50 focus:border-red-500/50" : ""
                }`}
              />
              <svg className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={submitting}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-light transition-colors p-1"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="min-h-[16px] pl-1">
              {errors.password && <p className="text-[10px] font-medium text-red-400 font-mono">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full btn btn-primary py-2.5 font-bold text-xs uppercase tracking-wider rounded relative mt-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <span className="spinner text-bg-dark w-3.5 h-3.5"></span>
                Verifying...
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex py-4 items-center z-10">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase tracking-widest text-text-muted font-mono">Or</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        {/* Google Authentication */}
        <button
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="w-full btn btn-secondary py-2.5 font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 border border-white/5 hover:border-white/10 relative z-10 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
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
        <div className="text-center mt-5 relative z-10 font-mono">
          <button
            onClick={toggleMode}
            disabled={submitting}
            className="text-[10px] text-text-gray hover:text-brand-blue hover:underline transition-all cursor-pointer bg-transparent border-0 outline-none"
          >
            {mode === "login" ? (
              <>
                New to comfeSpace? <span className="font-semibold text-white hover:text-brand-blue">[Register here]</span>
              </>
            ) : (
              <>
                Have an account? <span className="font-semibold text-white hover:text-brand-blue">[Sign in here]</span>
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
        <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4">
          <div className="spinner text-brand-blue"></div>
          <p className="text-xs text-text-gray animate-pulse font-mono uppercase tracking-widest">
            Loading security...
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
