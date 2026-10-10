"use client";

import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("kai_admin_authenticated") === "true";
    }
    return false;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = (password: string): boolean => {
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "kai2024";
    if (password === validPassword) {
      setIsAdmin(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("kai_admin_authenticated", "true");
      }
      setShowLoginModal(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("kai_admin_authenticated");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
