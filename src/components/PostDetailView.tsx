"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PostItem, FolderType } from "@/types";
import { fetchPostById } from "@/lib/store";
import { CommentSection } from "@/components/CommentSection";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Maximize2,
  X,
  Share2,
  User,
} from "lucide-react";

interface PostDetailViewProps {
  id: string;
  folder: FolderType;
}

export function PostDetailView({ id, folder }: PostDetailViewProps) {
  const [post, setPost] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPostById(id).then((data) => {
      if (active) {
        setPost(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center font-mono text-xs text-slate-500">
        Memuat detail publikasi...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center font-mono text-xs space-y-4">
        <p className="text-slate-400">Postingan tidak ditemukan atau telah dihapus.</p>
        <Link
          href={`/${folder}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-slate-800 text-teal-400"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke folder {folder}
        </Link>
      </div>
    );
  }

  const isBullish = post.bias === "BULLISH";
  const isBearish = post.bias === "BEARISH";

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href={`/${folder}`}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-teal-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Folder {folder.toUpperCase()}</span>
        </Link>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0E1522] border border-slate-800 text-[11px] text-slate-400 hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? "Link Disalin!" : "Bagikan"}</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className={`px-2.5 py-0.5 rounded font-bold text-xs flex items-center gap-1 ${
              isBullish
                ? "bg-teal-950 text-teal-300 border border-teal-800"
                : isBearish
                ? "bg-red-950 text-red-300 border border-red-900"
                : "bg-slate-800 text-slate-300 border border-slate-700"
            }`}
          >
            {isBullish && <TrendingUp className="w-3.5 h-3.5 text-teal-400" />}
            {isBearish && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
            {post.bias} BIAS
          </span>

          <span className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded border border-slate-700 font-bold">
            {post.ticker}
          </span>
          <span className="text-slate-400">{post.instrument}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">TF: {post.timeframe}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-teal-400" /> Analis: {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />{" "}
            {new Date(post.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Hero Chart Image Viewer with Fullscreen Lightbox */}
      <div className="relative border border-slate-800 bg-[#080C14] rounded-xl overflow-hidden group">
        <div className="p-3 bg-[#0D1420] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-200">
            {post.ticker} · Chart &amp; Visual Anotasi
          </span>
          <button
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white text-[11px]"
          >
            <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Perbesar Gambar</span>
          </button>
        </div>

        <div
          onClick={() => setLightboxOpen(true)}
          className="cursor-pointer relative overflow-hidden flex items-center justify-center min-h-[350px] bg-black"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-[600px] object-contain group-hover:opacity-95 transition-opacity"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none">
            <span className="px-4 py-2 rounded-full bg-slate-900/90 text-teal-300 border border-teal-500/40 text-xs flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-teal-400" />
              Klik untuk inspeksi resolusi penuh
            </span>
          </div>
        </div>
      </div>

      {/* Analysis Description Section */}
      <div className="border border-slate-800 bg-[#0C121E] rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="text-base font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
          <span>Deskripsi &amp; Narasi Struktur Pasar</span>
        </h2>
        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
          {post.description}
        </div>
      </div>

      {/* Comments Section */}
      <CommentSection postId={post.id} />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-6xl max-h-[92vh]">
            <img
              src={post.imageUrl}
              alt="Fullscreen View"
              className="max-h-[88vh] w-auto mx-auto rounded shadow-2xl object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-red-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
