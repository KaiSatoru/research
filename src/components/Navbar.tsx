"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AdminLoginModal } from "./AdminLoginModal";
import {
  Menu,
  X,
  Search,
  Lock,
  Unlock,
  LogOut,
  FolderOpen,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/analysis", label: "Analysis" },
  { href: "/outlook", label: "Outlook" },
  { href: "/backtesting", label: "Backtesting" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isAdmin, logout, setShowLoginModal } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo from Image 1: X KAI RESEARCH */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Minimalist X Logo */}
              <div className="w-7 h-7 rounded bg-[#111827] border border-slate-700/80 flex items-center justify-center text-teal-400 group-hover:border-teal-500 transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-slate-100 group-hover:text-teal-400 transition-colors"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <span className="font-mono font-bold tracking-wider text-base sm:text-lg text-slate-100 group-hover:text-teal-400 transition-colors">
                KAI RESEARCH
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-150 ${
                      isActive
                        ? "text-teal-300 bg-teal-950/60 border border-teal-800/80 font-medium"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Admin Pill */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Quick Search Button */}
              <Link
                href="/archive"
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
                title="Pencarian Arsip & Folder"
              >
                <Search className="w-4 h-4" />
              </Link>

              {/* Mode Switcher Pill */}
              {isAdmin ? (
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-teal-950/80 border border-teal-700 text-teal-300 font-mono text-[11px]">
                  <Unlock className="w-3.5 h-3.5 text-teal-400" />
                  <span>MODE EDITOR</span>
                  <button
                    onClick={logout}
                    className="p-1 ml-1 hover:text-white text-teal-400/80 hover:bg-teal-900 rounded"
                    title="Keluar dari mode editor"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E1522] border border-slate-800 text-slate-400 hover:text-teal-300 hover:border-slate-700 font-mono text-[11px] transition-colors"
                  title="Klik untuk beralih ke Mode Editor (Password)"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Mode</span>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="p-1.5 rounded text-slate-400 hover:text-white"
                title="Admin Login"
              >
                {isAdmin ? <Unlock className="w-4 h-4 text-teal-400" /> : <Lock className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-md"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-b border-slate-800 bg-[#0B0F17] px-4 pt-2 pb-4 space-y-1 font-mono text-xs">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded ${
                    isActive
                      ? "text-teal-300 bg-teal-950/80 border border-teal-800"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-2">
              <span className="flex items-center gap-1">
                <FolderOpen className="w-3.5 h-3.5 text-teal-400" /> KAI RESEARCH
              </span>
              <span>{isAdmin ? "Editor Mode" : "View Mode"}</span>
            </div>
          </div>
        )}
      </header>

      {/* Global Admin Login Modal */}
      <AdminLoginModal />
    </>
  );
}
