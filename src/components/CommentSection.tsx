"use client";

import React, { useState, useEffect } from "react";
import { CommentItem } from "@/types";
import { fetchComments, addComment, deleteComment, togglePinComment, uploadImage } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import {
  MessageSquare,
  Pin,
  Trash2,
  Paperclip,
  X,
  Send,
  ShieldCheck,
  Maximize2,
  AlertCircle,
} from "lucide-react";

interface CommentSectionProps {
  postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { isAdmin } = useAuth();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [previewAttachmentUrl, setPreviewAttachmentUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Lightbox for comment images
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const loadComments = React.useCallback(async () => {
    try {
      const data = await fetchComments(postId);
      setComments(data);
    } catch {
      // Ignored
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    let active = true;
    fetchComments(postId).then((data) => {
      if (active) {
        setComments(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [postId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(file.type)) {
      setErrorMsg("Lampiran harus berformat PNG, JPG, JPEG, atau WEBP.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("Ukuran foto lampiran melebihi 10MB.");
      return;
    }

    setAttachedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewAttachmentUrl(url);
  };

  const handleRemoveAttachment = () => {
    setAttachedFile(null);
    setPreviewAttachmentUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) {
      setErrorMsg("Nama dan pesan komentar wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      let finalImgUrl: string | undefined = undefined;
      if (attachedFile) {
        finalImgUrl = await uploadImage(attachedFile, "comment-images");
      }

      await addComment({
        postId,
        authorName: authorName.trim(),
        content: content.trim(),
        imageUrl: finalImgUrl,
      });

      // Reset form
      setContent("");
      setAttachedFile(null);
      setPreviewAttachmentUrl(null);
      setIsSubmitting(false);

      // Refresh comments
      await loadComments();
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMsg(err instanceof Error ? err.message : "Gagal mengirim komentar.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus komentar ini secara permanen?")) return;
    await deleteComment(id);
    await loadComments();
  };

  const handleTogglePin = async (id: string, currentStatus: boolean) => {
    await togglePinComment(id, currentStatus);
    await loadComments();
  };

  return (
    <div className="border border-slate-800 bg-[#0C121E] rounded-xl p-5 sm:p-7 space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Diskusi Komunitas ({comments.length})
          </h3>
        </div>
        <span className="text-[11px] text-slate-500">
          Upload markup grafik hingga 10MB diperbolehkan
        </span>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="p-4 rounded-lg bg-[#080C14] border border-slate-800/80 space-y-3">
        <div className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
          <span>Kirim Catatan atau Markup Grafik Anda:</span>
          {isAdmin && (
            <span className="text-teal-400 flex items-center gap-1 text-[10px]">
              <ShieldCheck className="w-3 h-3" /> Berkomentar sebagai Editor
            </span>
          )}
        </div>

        {errorMsg && (
          <div className="p-2 rounded bg-red-950/70 border border-red-800 text-red-300 text-[11px] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="sm:col-span-1">
            <input
              type="text"
              placeholder="Nama / Handle Anda..."
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#0D1420] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="text"
              placeholder="Tulis pendapat, konfluensi likuiditas, atau pertanyaan..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-3 py-2 rounded bg-[#0D1420] border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
            />
          </div>
        </div>

        {/* Attachment preview if selected */}
        {previewAttachmentUrl && (
          <div className="flex items-center gap-3 p-2 bg-[#0D1420] border border-slate-800 rounded">
            <img
              src={previewAttachmentUrl}
              alt="Preview"
              className="w-12 h-12 object-cover rounded border border-slate-700"
            />
            <div className="flex-1 truncate">
              <span className="text-slate-200 font-semibold block text-[11px] truncate">
                {attachedFile?.name}
              </span>
              <span className="text-slate-500 text-[10px]">
                {(attachedFile?.size ? attachedFile.size / (1024 * 1024) : 0).toFixed(2)} MB (Maks 10MB)
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveAttachment}
              className="p-1 text-slate-400 hover:text-red-400"
              title="Hapus lampiran"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="relative">
            <label
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0D1420] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
              title="Lampirkan foto PNG/JPG/JPEG maks 10MB"
            >
              <Paperclip className="w-3.5 h-3.5 text-teal-400" />
              <span>{attachedFile ? "Ganti Foto" : "Lampirkan Foto (Max 10MB)"}</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Mengirim..." : "Kirim"}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3 pt-2">
        {loading ? (
          <p className="text-slate-500 text-center py-4">Memuat diskusi...</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-slate-500 border border-dashed border-slate-800 rounded-lg">
            Belum ada komentar. Jadilah yang pertama memberikan analisis atau markup grafik!
          </div>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              className={`p-4 rounded-lg transition-all ${
                comm.isPinned
                  ? "bg-[#0E1B26] border-2 border-teal-500/80 shadow-lg shadow-teal-950/30"
                  : "bg-[#090E17] border border-slate-800/80"
              }`}
            >
              {/* Comment Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-100">{comm.authorName}</span>
                  {comm.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-700">
                      <Pin className="w-3 h-3 text-teal-400" />
                      PINNED BY EDITOR
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">
                    {new Date(comm.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>

                {/* Editor Moderation Controls (Only visible in Admin Mode) */}
                {isAdmin && (
                  <div className="flex items-center gap-1 bg-[#0D1420] border border-slate-800 rounded px-1.5 py-0.5">
                    <button
                      onClick={() => handleTogglePin(comm.id, comm.isPinned)}
                      className={`p-1 rounded transition-colors ${
                        comm.isPinned
                          ? "text-teal-400 hover:text-teal-300"
                          : "text-slate-400 hover:text-teal-400"
                      }`}
                      title={comm.isPinned ? "Lepas Pin" : "Sematkan / Pin Komentar"}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(comm.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-400 transition-colors"
                      title="Hapus Komentar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Comment Text */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {comm.content}
              </p>

              {/* Attached Image if any */}
              {comm.imageUrl && (
                <div className="mt-3">
                  <div
                    onClick={() => setLightboxImg(comm.imageUrl!)}
                    className="relative group cursor-pointer inline-block max-w-sm rounded border border-slate-700 overflow-hidden bg-black"
                  >
                    <img
                      src={comm.imageUrl}
                      alt="Markup Attachment"
                      className="max-h-48 w-auto object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="bg-slate-900/90 text-teal-300 text-[10px] px-2 py-1 rounded flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> Perbesar Foto
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Lightbox for comment images */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={lightboxImg} alt="Lampiran Penuh" className="max-h-[85vh] w-auto mx-auto rounded shadow-2xl" />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-red-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
