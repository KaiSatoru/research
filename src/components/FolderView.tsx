"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { FolderType, PostItem } from "@/types";
import { fetchPosts, deletePost } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { PostUploadModal } from "./PostUploadModal";
import {
  FolderOpen,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Trash2,
  Pin,
} from "lucide-react";

interface FolderViewProps {
  folder: FolderType;
  title: string;
  subtitle: string;
}

export function FolderView({ folder, title, subtitle }: FolderViewProps) {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBias, setSelectedBias] = useState<string>("ALL");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchPosts(folder);
      setPosts(data);
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    let active = true;
    fetchPosts(folder).then((data) => {
      if (active) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [folder]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchBias = selectedBias === "ALL" || p.bias === selectedBias;
      return matchSearch && matchBias;
    });
  }, [posts, searchQuery, selectedBias]);

  const handleDeletePost = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Hapus postingan ini dari folder?")) return;
    await deletePost(id);
    await loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-mono">
      {/* Folder Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs mb-1">
            <FolderOpen className="w-4 h-4" />
            <span className="uppercase tracking-wider">SISTEM FOLDER DOKUMENTASI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl font-sans leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Upload Button for Admin */}
        {isAdmin && (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shrink-0 shadow-lg shadow-teal-500/10"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Foto &amp; Analisis Baru</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-lg bg-[#0C121E] border border-slate-800 text-xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder={`Cari di folder ${folder}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
          />
        </div>

        {/* Bias Tabs */}
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="text-slate-500 text-[11px] mr-1">Bias:</span>
          {["ALL", "BULLISH", "BEARISH", "NEUTRAL"].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBias(b)}
              className={`px-2 py-1 rounded text-[11px] transition-colors ${
                selectedBias === b
                  ? "bg-teal-950 text-teal-300 border border-teal-800 font-semibold"
                  : "bg-slate-800/40 text-slate-400 hover:text-white"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Item Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Menampilkan <strong className="text-white">{filteredPosts.length}</strong> publikasi di folder{" "}
          <span className="text-teal-400 uppercase">[{folder}]</span>
        </span>
        <span className="text-slate-500">Background Polos untuk Keterbacaan Visual</span>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500">Memuat berkas folder...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500 space-y-3">
          <FolderOpen className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm text-slate-400">Belum ada publikasi di folder ini.</p>
          {isAdmin && (
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 rounded bg-teal-500 text-slate-950 font-bold text-xs"
            >
              Upload Post Pertama
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isBullish = post.bias === "BULLISH";
            const isBearish = post.bias === "BEARISH";

            return (
              <article
                key={post.id}
                className="border border-slate-800 bg-[#0C121E] hover:border-slate-700 rounded-xl overflow-hidden flex flex-col justify-between transition-all group hover:shadow-xl hover:shadow-teal-950/20"
              >
                <div>
                  {/* Photo Thumbnail */}
                  <Link href={`/${folder}/${post.id}`} className="block relative aspect-video bg-black overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 backdrop-blur-md ${
                          isBullish
                            ? "bg-teal-950/90 text-teal-300 border border-teal-700"
                            : isBearish
                            ? "bg-red-950/90 text-red-300 border border-red-800"
                            : "bg-slate-900/90 text-slate-300 border border-slate-700"
                        }`}
                      >
                        {isBullish && <TrendingUp className="w-3 h-3 text-teal-400" />}
                        {isBearish && <TrendingDown className="w-3 h-3 text-red-400" />}
                        {post.bias}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white border border-slate-700 backdrop-blur-md">
                        {post.ticker}
                      </span>
                    </div>

                    {post.pinned && (
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500 text-slate-950 flex items-center gap-1">
                          <Pin className="w-3 h-3" /> PINNED
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{post.timeframe}</span>
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/${folder}/${post.id}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-sans">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 py-3 bg-[#080C14] border-t border-slate-800 flex items-center justify-between text-xs">
                  <Link
                    href={`/${folder}/${post.id}`}
                    className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Buka &amp; Komentar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {/* Admin Delete Action */}
                  {isAdmin && (
                    <button
                      onClick={(e) => handleDeletePost(post.id, e)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Hapus Postingan Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <PostUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        defaultFolder={folder}
        onSuccess={loadData}
      />
    </div>
  );
}
