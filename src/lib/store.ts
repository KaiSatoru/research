import { PostItem, CommentItem, FolderType } from "@/types";
import { supabase, isSupabaseConfigured } from "./supabase";

// Initial seed data for immediate rich experience
const initialPosts: PostItem[] = [
  {
    id: "post-analysis-01",
    createdAt: "2026-10-10T14:30:00Z",
    folder: "analysis",
    title: "NQ100: NY AM Liquidity Sweep & Displacement ke 15M FVG",
    instrument: "Nasdaq-100 Futures",
    ticker: "NQ1!",
    timeframe: "15M / 1H",
    bias: "BULLISH",
    description:
      "Setelah menyapu Asian & London Low (Sell-Side Liquidity) pada pembukaan sesi New York, NQ mencetak displacement kuat ke atas dengan Market Structure Shift (MSS) di 15M, meninggalkan Fair Value Gap (FVG) diskon di antara 20,590 - 20,625 yang direspek sebagai zona entri primer.",
    imageUrl: "/images/hero-anime.png", // Will use uploaded image or sample
    author: "Kai",
    pinned: true,
  },
  {
    id: "post-analysis-02",
    createdAt: "2026-10-09T08:15:00Z",
    folder: "analysis",
    title: "EUR/USD: London Judas Swing Menuju HTF Sell-Side Liquidity",
    instrument: "Euro / US Dollar",
    ticker: "EURUSD",
    timeframe: "15M / Daily",
    bias: "BEARISH",
    description:
      "Pergerakan manipulasi Judas Swing pada London Open menyapu Asian High di 1.0895 sebelum displacement agresif ke bawah menuju target likuiditas eksternal 1.0820. Rasio Risk-to-Reward terealisasi 1 : 3.8 R:R.",
    imageUrl: "/images/hero-anime.png",
    author: "Kai",
  },
  {
    id: "post-outlook-01",
    createdAt: "2026-10-08T18:00:00Z",
    folder: "outlook",
    title: "Weekly Market Outlook: Indeks DXY, Gold ATH & US Equity Macros",
    instrument: "Multi-Asset Macro",
    ticker: "DXY / XAU / NQ",
    timeframe: "Daily / Weekly",
    bias: "BULLISH",
    description:
      "Pemetaan bias mingguan. DXY sedang menguji Daily Bearish Order Block. Emas mempertahankan struktur higher low dengan SMT divergence terhadap Perak, mengindikasikan kelanjutan ekspansi menuju All-Time High baru di $2,685+.",
    imageUrl: "/images/hero-anime.png",
    author: "Kai",
    pinned: true,
  },
  {
    id: "post-backtesting-01",
    createdAt: "2026-10-05T10:00:00Z",
    folder: "backtesting",
    title: "NY AM Silver Bullet (10:00–11:00 EST): 180-Session Quantitative Backtest",
    instrument: "Nasdaq & S&P 500",
    ticker: "NQ1! / ES1!",
    timeframe: "5M / 1M Execution",
    bias: "BULLISH",
    description:
      "Hasil evaluasi 180 sesi trading. Model Silver Bullet menghasilkan win rate 67.8% dengan profit factor 2.41 dan rata-rata R:R 1:2.35. Filter terpenting yang meningkatkan win-rate dari 50% menjadi 73% adalah keharusan adanya Session Liquidity Sweep sebelum jam 10:00 EST.",
    imageUrl: "/images/hero-anime.png",
    author: "Kai",
  },
  {
    id: "post-archive-01",
    createdAt: "2026-09-20T12:00:00Z",
    folder: "archive",
    title: "Internal vs External Range Liquidity: Filter False Breakout 15M FVG",
    instrument: "E-Mini Futures",
    ticker: "ES1!",
    timeframe: "15M",
    bias: "NEUTRAL",
    description:
      "Dokumentasi arsip siklus penghantaran harga antara Old Highs/Lows dan inefisiensi harga. FVG yang terbentuk pasca sweep ERL memiliki win-rate 74%, dibandingkan 41% pada FVG acak di tengah range.",
    imageUrl: "/images/hero-anime.png",
    author: "Kai",
  },
];

const initialComments: CommentItem[] = [
  {
    id: "comm-01",
    createdAt: "2026-10-10T15:10:00Z",
    postId: "post-analysis-01",
    authorName: "Kai (Editor)",
    content: "Catatan Editor: Perhatikan level 20,530 sebagai invalidasi ketat. Jangan memaksakan entry jika terjadi lilin impulsif 15M yang menutup di bawah level tersebut.",
    isPinned: true,
  },
  {
    id: "comm-02",
    createdAt: "2026-10-10T16:05:00Z",
    postId: "post-analysis-01",
    authorName: "Rifqi_Trader",
    content: "Terima kasih breakdown-nya bang. Saya juga melihat SMT divergence yang bersih antara NQ dan ES di 10:15 tadi. Ini markup chart 5M saya:",
    isPinned: false,
  },
];

// Local storage key names
const STORAGE_POSTS_KEY = "kai_research_posts_v1";
const STORAGE_COMMENTS_KEY = "kai_research_comments_v1";

// Helpers for Local Storage fallback
function getLocalPosts(): PostItem[] {
  if (typeof window === "undefined") return initialPosts;
  const data = localStorage.getItem(STORAGE_POSTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialPosts;
  }
}

function saveLocalPosts(posts: PostItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
  }
}

function getLocalComments(): CommentItem[] {
  if (typeof window === "undefined") return initialComments;
  const data = localStorage.getItem(STORAGE_COMMENTS_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(initialComments));
    return initialComments;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialComments;
  }
}

function saveLocalComments(comments: CommentItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(comments));
  }
}

// -------------------------------------------------------------
// POST OPERATIONS (Supabase + LocalStorage Hybrid)
// -------------------------------------------------------------

export async function fetchPosts(folder?: FolderType): Promise<PostItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
      if (folder) {
        query = query.eq("folder", folder);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          createdAt: item.created_at,
          folder: item.folder as FolderType,
          title: item.title,
          instrument: item.instrument,
          ticker: item.ticker,
          timeframe: item.timeframe,
          bias: item.bias,
          description: item.description,
          imageUrl: item.image_url,
          author: item.author,
          pinned: item.pinned,
        }));
      }
    } catch {
      // Fallback to local
    }
  }

  const posts = getLocalPosts();
  if (folder) {
    return posts.filter((p) => p.folder === folder);
  }
  return posts;
}

export async function fetchPostById(id: string): Promise<PostItem | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (!error && data) {
        return {
          id: data.id,
          createdAt: data.created_at,
          folder: data.folder as FolderType,
          title: data.title,
          instrument: data.instrument,
          ticker: data.ticker,
          timeframe: data.timeframe,
          bias: data.bias,
          description: data.description,
          imageUrl: data.image_url,
          author: data.author,
          pinned: data.pinned,
        };
      }
    } catch {
      // Fallback
    }
  }

  const posts = getLocalPosts();
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(postData: Omit<PostItem, "id" | "createdAt">): Promise<PostItem> {
  const newPost: PostItem = {
    ...postData,
    id: `post-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          folder: postData.folder,
          title: postData.title,
          instrument: postData.instrument,
          ticker: postData.ticker,
          timeframe: postData.timeframe,
          bias: postData.bias,
          description: postData.description,
          image_url: postData.imageUrl,
          author: postData.author || "Kai",
          pinned: postData.pinned || false,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          createdAt: data.created_at,
          folder: data.folder as FolderType,
          title: data.title,
          instrument: data.instrument,
          ticker: data.ticker,
          timeframe: data.timeframe,
          bias: data.bias,
          description: data.description,
          imageUrl: data.image_url,
          author: data.author,
          pinned: data.pinned,
        };
      }
    } catch {
      // Fallback
    }
  }

  const current = getLocalPosts();
  const updated = [newPost, ...current];
  saveLocalPosts(updated);
  return newPost;
}

export async function deletePost(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("posts").delete().eq("id", id);
    } catch {
      // Fallback
    }
  }

  const current = getLocalPosts();
  const updated = current.filter((p) => p.id !== id);
  saveLocalPosts(updated);
}

// -------------------------------------------------------------
// COMMENT OPERATIONS (Supabase + LocalStorage Hybrid)
// -------------------------------------------------------------

export async function fetchComments(postId: string): Promise<CommentItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: true });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          createdAt: item.created_at,
          postId: item.post_id,
          authorName: item.author_name,
          content: item.content,
          imageUrl: item.image_url,
          isPinned: item.is_pinned,
        }));
      }
    } catch {
      // Fallback
    }
  }

  const allComments = getLocalComments();
  return allComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
}

export async function addComment(
  commentData: Omit<CommentItem, "id" | "createdAt" | "isPinned">
): Promise<CommentItem> {
  const newComment: CommentItem = {
    ...commentData,
    id: `comm-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isPinned: false,
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          post_id: commentData.postId,
          author_name: commentData.authorName,
          content: commentData.content,
          image_url: commentData.imageUrl || null,
          is_pinned: false,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          createdAt: data.created_at,
          postId: data.post_id,
          authorName: data.author_name,
          content: data.content,
          imageUrl: data.image_url,
          isPinned: data.is_pinned,
        };
      }
    } catch {
      // Fallback
    }
  }

  const current = getLocalComments();
  const updated = [...current, newComment];
  saveLocalComments(updated);
  return newComment;
}

export async function deleteComment(commentId: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("comments").delete().eq("id", commentId);
    } catch {
      // Fallback
    }
  }

  const current = getLocalComments();
  const updated = current.filter((c) => c.id !== commentId);
  saveLocalComments(updated);
}

export async function togglePinComment(commentId: string, currentPinStatus: boolean): Promise<void> {
  const nextStatus = !currentPinStatus;

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("comments").update({ is_pinned: nextStatus }).eq("id", commentId);
    } catch {
      // Fallback
    }
  }

  const current = getLocalComments();
  const updated = current.map((c) => (c.id === commentId ? { ...c, isPinned: nextStatus } : c));
  saveLocalComments(updated);
}

// -------------------------------------------------------------
// IMAGE UPLOAD HELPER (Max 10MB)
// -------------------------------------------------------------

export async function uploadImage(file: File, bucket: "analysis-images" | "comment-images"): Promise<string> {
  // Check 10MB limit
  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("Ukuran foto melebihi batas maksimal 10MB");
  }

  // Supabase Storage upload
  if (isSupabaseConfigured && supabase) {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
      if (!uploadError) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
        if (data?.publicUrl) {
          return data.publicUrl;
        }
      }
    } catch {
      // Fall back to base64
    }
  }

  // Fallback: Convert to Base64 Data URL for local instant preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
