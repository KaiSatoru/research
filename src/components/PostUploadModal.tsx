"use client";

import React, { useState } from "react";
import { FolderType, Bias } from "@/types";
import { createPost, uploadImage } from "@/lib/store";
import {
  X,
  UploadCloud,
  FileImage,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface PostUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultFolder?: FolderType;
  onSuccess?: () => void;
}

export function PostUploadModal({
  isOpen,
  onClose,
  defaultFolder = "analysis",
  onSuccess,
}: PostUploadModalProps) {
  const [folder, setFolder] = useState<FolderType>(defaultFolder);
  const [title, setTitle] = useState("");
  const [instrument, setInstrument] = useState("");
  const [ticker, setTicker] = useState("");
  const [timeframe, setTimeframe] = useState("15M / 1H");
  const [bias, setBias] = useState<Bias>("BULLISH");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
      setErrorMsg("Format file harus berupa PNG, JPG, JPEG, atau WEBP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Ukuran file melebihi batas maksimal 10MB.");
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg("Judul dan deskripsi wajib diisi.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      let finalImageUrl = "/images/hero-anime.png";
      if (selectedFile) {
        finalImageUrl = await uploadImage(selectedFile, "analysis-images");
      }

      await createPost({
        folder,
        title,
        instrument: instrument || "Market General",
        ticker: ticker || "KR1!",
        timeframe: timeframe || "15M",
        bias,
        description,
        imageUrl: finalImageUrl,
        author: "Kai",
      });

      setIsLoading(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setIsLoading(false);
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengunggah postingan.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0C121E] border border-slate-800 rounded-xl p-6 shadow-2xl relative font-mono my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5 pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-teal-400" />
            <span>Upload Publikasi Baru ke Folder</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unggah tangkapan layar grafik teknikal, pilih folder tujuan, dan tambahkan analisis terstruktur.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Folder & Bias Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Folder Tujuan:</label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value as FolderType)}
                className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500 uppercase"
              >
                <option value="analysis">Folder: Analysis</option>
                <option value="outlook">Folder: Outlook</option>
                <option value="backtesting">Folder: Backtesting</option>
                <option value="archive">Folder: Archive</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Bias Pasar:</label>
              <select
                value={bias}
                onChange={(e) => setBias(e.target.value as Bias)}
                className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
              >
                <option value="BULLISH">BULLISH (Teal)</option>
                <option value="BEARISH">BEARISH (Crimson)</option>
                <option value="NEUTRAL">NEUTRAL (Range)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Judul Analisis:</label>
            <input
              type="text"
              placeholder="Contoh: NQ100: NY AM 15M FVG & Liquidity Sweep..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Instrument, Ticker, Timeframe */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Instrumen:</label>
              <input
                type="text"
                placeholder="Contoh: Nasdaq-100"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Ticker:</label>
              <input
                type="text"
                placeholder="Contoh: NQ1! / EURUSD"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Timeframe:</label>
              <input
                type="text"
                placeholder="Contoh: 15M / 1H"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Foto / Screenshot Grafik (PNG, JPG, JPEG - Maks 10MB):
            </label>
            <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/60 rounded-lg p-4 bg-[#080C14] text-center transition-colors relative">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <div className="space-y-2">
                  <div className="relative inline-block max-h-48 overflow-hidden rounded border border-slate-700">
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto object-contain" />
                  </div>
                  <p className="text-teal-400 text-[11px] font-semibold">
                    {selectedFile?.name} ({(selectedFile?.size ? selectedFile.size / (1024 * 1024) : 0).toFixed(2)} MB)
                  </p>
                  <p className="text-slate-500 text-[10px]">Klik untuk mengganti gambar</p>
                </div>
              ) : (
                <div className="py-4 space-y-1">
                  <FileImage className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-slate-300 font-semibold">Klik atau seret gambar ke sini</p>
                  <p className="text-slate-500 text-[11px]">PNG, JPG, JPEG hingga ukuran 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">
              Deskripsi &amp; Narasi Analisis:
            </label>
            <textarea
              rows={4}
              placeholder="Jelaskan alur likuiditas, Fair Value Gap (FVG), swing levels, dan kondisi invalidasi..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#080C14] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 font-sans leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <span>Mengunggah...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publikasikan ke Folder</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
