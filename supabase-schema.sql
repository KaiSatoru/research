-- ========================================================
-- KAI RESEARCH: SUPABASE DATABASE & STORAGE SCHEMA
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda.
-- ========================================================

-- 1. Tabel Posts (Folder: analysis, outlook, backtesting, archive)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  folder VARCHAR(50) NOT NULL, -- 'analysis', 'outlook', 'backtesting', 'archive'
  title TEXT NOT NULL,
  instrument VARCHAR(50) NOT NULL,
  ticker VARCHAR(30) NOT NULL,
  timeframe VARCHAR(30) NOT NULL,
  bias VARCHAR(20) DEFAULT 'NEUTRAL' NOT NULL, -- 'BULLISH', 'BEARISH', 'NEUTRAL'
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT DEFAULT 'Kai' NOT NULL,
  pinned BOOLEAN DEFAULT false NOT NULL
);

-- 2. Tabel Comments (dengan attachment foto maks 10MB)
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT, -- Opsional, attachment gambar dari viewer
  is_pinned BOOLEAN DEFAULT false NOT NULL
);

-- 3. Indeks untuk performa query cepat
CREATE INDEX IF NOT EXISTS idx_posts_folder ON public.posts(folder);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_pinned ON public.comments(is_pinned DESC, created_at ASC);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 5. Kebijakan RLS (Public read, Public comment, Admin manage)
-- Siapapun dapat membaca post
CREATE POLICY "Public Read Posts" ON public.posts
  FOR SELECT USING (true);

-- Siapapun dapat membaca komentar
CREATE POLICY "Public Read Comments" ON public.comments
  FOR SELECT USING (true);

-- Siapapun dapat mengirim komentar (dengan batasan)
CREATE POLICY "Public Insert Comments" ON public.comments
  FOR INSERT WITH CHECK (true);

-- Admin dapat insert/update/delete posts
CREATE POLICY "Admin Insert Posts" ON public.posts
  FOR ALL USING (true);

-- Admin dapat update/delete comments (pin/hapus)
CREATE POLICY "Admin Manage Comments" ON public.comments
  FOR ALL USING (true);

-- ========================================================
-- STORAGE BUCKETS (Jalankan di Supabase Storage / SQL):
-- Buat dua bucket public:
-- 1. 'analysis-images' (untuk chart admin)
-- 2. 'comment-images'  (untuk upload gambar komentar maks 10MB)
-- ========================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('analysis-images', 'analysis-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']),
  ('comment-images', 'comment-images', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Kebijakan akses Storage:
CREATE POLICY "Public Access Analysis Images" ON storage.objects
  FOR SELECT USING (bucket_id IN ('analysis-images', 'comment-images'));

CREATE POLICY "Public Upload Comment Images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comment-images');

CREATE POLICY "Admin Upload Analysis Images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'analysis-images');
