"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, X, KeyRound, AlertCircle, ShieldCheck } from "lucide-react";

export function AdminLoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!showLoginModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
    } else {
      setError(false);
      setPassword("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#0D1420] border border-slate-800 rounded-xl p-6 shadow-2xl relative font-mono">
        <button
          onClick={() => {
            setShowLoginModal(false);
            setError(false);
            setPassword("");
          }}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Mode Akses Editor / Admin</h3>
            <p className="text-xs text-slate-400">KAI RESEARCH Management</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          Secara default seluruh pengunjung berada di <strong>Mode View</strong>. Masukkan kata sandi
          editor untuk mengunggah analisis, mengelola postingan, serta pin/hapus komentar.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Password Editor
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Masukkan password admin..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded bg-[#080C14] border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Password salah. Silakan coba lagi.
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="px-4 py-2 rounded text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Masuk Mode Editor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
