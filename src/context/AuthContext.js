"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, isConfigured } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // For Mock Mode State
  const [mockUsers, setMockUsers] = useState([]);

  useEffect(() => {
    // Load registered mock users from localStorage if on client
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("aura_mock_registered_users");
      if (stored) {
        try {
          setMockUsers(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Monitor Auth State
  useEffect(() => {
    if (isConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email.split("@")[0],
            photoURL: firebaseUser.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${firebaseUser.uid}`
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Mock Mode: check sessionStorage for logged-in user
      if (typeof window !== "undefined") {
        const sessionUser = sessionStorage.getItem("aura_mock_logged_in_user");
        if (sessionUser) {
          try {
            setUser(JSON.parse(sessionUser));
          } catch (e) {
            console.error(e);
          }
        }
      }
      setLoading(false);
    }
  }, []);

  // Email/Password Registration
  const register = async (email, password, displayName) => {
    setLoading(true);
    try {
      if (isConfigured && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: displayName,
          photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${userCredential.user.uid}`
        });
        return { success: true };
      } else {
        // Mock Registration
        const uid = `mock-user-${Math.random().toString(36).substring(2, 9)}`;
        const newUser = {
          uid,
          email,
          password, // stored for simple mock authentication matching
          displayName: displayName || email.split("@")[0],
          photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${uid}`
        };

        const updatedUsers = [...mockUsers, newUser];
        setMockUsers(updatedUsers);
        if (typeof window !== "undefined") {
          localStorage.setItem("aura_mock_registered_users", JSON.stringify(updatedUsers));
          sessionStorage.setItem("aura_mock_logged_in_user", JSON.stringify({
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL
          }));
        }
        setUser({
          uid: newUser.uid,
          email: newUser.email,
          displayName: newUser.displayName,
          photoURL: newUser.photoURL
        });
        return { success: true };
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      if (isConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || userCredential.user.email.split("@")[0],
          photoURL: userCredential.user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${userCredential.user.uid}`
        });
        return { success: true };
      } else {
        // Mock Login
        const stored = typeof window !== "undefined" ? localStorage.getItem("aura_mock_registered_users") : null;
        let localUsers = mockUsers;
        if (stored) {
          try { localUsers = JSON.parse(stored); } catch (e) {}
        }
        
        // Find user by email and matching password
        const matched = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (matched) {
          if (matched.password !== password) {
            throw new Error("auth/wrong-password: The password you entered is incorrect.");
          }
          const loggedUser = {
            uid: matched.uid,
            email: matched.email,
            displayName: matched.displayName,
            photoURL: matched.photoURL
          };
          if (typeof window !== "undefined") {
            sessionStorage.setItem("aura_mock_logged_in_user", JSON.stringify(loggedUser));
          }
          setUser(loggedUser);
          return { success: true };
        } else {
          // If user doesn't exist, create a mock user dynamically for ease of testing!
          const uid = `mock-user-${Math.random().toString(36).substring(2, 9)}`;
          const autoCreatedUser = {
            uid,
            email,
            displayName: email.split("@")[0],
            photoURL: `https://api.dicebear.com/7.x/adventurer/svg?seed=${uid}`
          };
          if (typeof window !== "undefined") {
            sessionStorage.setItem("aura_mock_logged_in_user", JSON.stringify(autoCreatedUser));
          }
          setUser(autoCreatedUser);
          return { success: true };
        }
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (isConfigured && auth) {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userCred = result.user;
        setUser({
          uid: userCred.uid,
          email: userCred.email,
          displayName: userCred.displayName || userCred.email.split("@")[0],
          photoURL: userCred.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${userCred.uid}`
        });
        return { success: true };
      } else {
        // Mock Google Login
        const uid = `mock-google-user-${Math.random().toString(36).substring(2, 9)}`;
        const mockGoogleUser = {
          uid,
          email: "google.user@example.com",
          displayName: "Google User Demo",
          photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${uid}`
        };
        if (typeof window !== "undefined") {
          sessionStorage.setItem("aura_mock_logged_in_user", JSON.stringify(mockGoogleUser));
        }
        setUser(mockGoogleUser);
        return { success: true };
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      if (isConfigured && auth) {
        await signOut(auth);
      } else {
        // Mock Logout
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("aura_mock_logged_in_user");
        }
      }
      setUser(null);
      return { success: true };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
        isMock: !isConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
