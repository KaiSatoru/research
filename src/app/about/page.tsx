import React from "react";
import {
  Mail,
  Send,
  Globe,
  Code2,
  BookOpen,
  Layers,
  Clock,
  Compass,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          <span>MODUL 05 · PROFIL &amp; PRINSIP RISET</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
          Tentang KAI RESEARCH
        </h1>
        <p className="text-sm text-slate-400 mt-2 font-mono">
          Profil analis, kerangka metodologi ICT, batasan riset profesional, dan kanal kontak.
        </p>
      </div>

      {/* Author Profile Card */}
      <div className="border border-slate-800 bg-[#0C121E] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-slate-800/80">
          <div className="w-20 h-20 rounded-xl bg-[#111A29] border-2 border-teal-500/60 flex items-center justify-center font-mono font-bold text-2xl text-teal-400 shadow-xl shrink-0">
            KAI
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-teal-950 text-teal-300 border border-teal-800 mb-1">
              INDEPENDENT TECHNICAL ANALYST
            </div>
            <h2 className="text-2xl font-bold font-mono text-white">Kai</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Spesialis Metodologi ICT · Market Structure · Quantitative Backtesting
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            Selamat datang di <strong>KAI RESEARCH</strong>. Platform ini didirikan atas dasar satu premis sederhana:{" "}
            <em>pasar finansial tidak digerakkan oleh garis tren sembarangan atau indikator lagging ritel, melainkan oleh algoritma likuiditas dan pencarian efisiensi harga.</em>
          </p>
          <p>
            Sebagai analis teknikal independen yang mendalami metodologi Inner Circle Trader (ICT) dan konsep Smart Money,
            fokus utama saya adalah menanggalkan segala bentuk spekulasi emosional. Setiap skenario pasar yang dipublikasikan
            di sini dirancang secara sistematis dengan titik invalidasi yang jelas, rasio Risk-to-Reward yang asimetris,
            serta evaluasi berbasis data empiris.
          </p>
        </div>
      </div>

      {/* Manifesto: Evidence Over Prediction */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#0B111D] to-[#0E1522] border-l-4 border-teal-500 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-wider text-sm">
          <Compass className="w-4 h-4" /> Manifesto: Evidence Over Prediction
        </div>
        <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
          &ldquo;Kami tidak meramal masa depan pasar seperti peramal bola kristal. Kami memetakan struktur harga yang ada saat ini,
          mengidentifikasi di mana likuiditas institusional tersimpan, dan mengeksekusi ketika ada pergeseran karakter harga (displacement)
          yang telah terkonfirmasi. Jika skenario tidak terwujud di titik invalidasi, kami mengevaluasi fakta secara jujur tanpa mengubah narasi.&rdquo;
        </p>
      </div>

      {/* Detailed ICT Methodology Framework */}
      <div className="space-y-6">
        <div className="border-b border-slate-800 pb-2">
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" /> Kerangka Metodologi ICT (Execution Engine)
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Komponen inti yang digunakan dalam seluruh analisis harian dan makalah riset:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 rounded-lg bg-[#0C121E] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Layers className="w-4 h-4" /> 1. Market Structure &amp; Shifts
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Menentukan arah tren melalui penembusan Swing High/Low utama. Pergeseran struktur pasar (Market Structure Shift / MSS)
              wajib divalidasi dengan lilin ekspansi berbadan tebal (Displacement).
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0C121E] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Compass className="w-4 h-4" /> 2. Liquidity Pools (BSL &amp; SSL)
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Pasar berburu likuiditas pembeli (Buy-side di atas Old Highs) dan penjual (Sell-side di bawah Old Lows).
              Manipulasi pembukaan sesi sering kali bertujuan merekayasa likuiditas sebelum ekspansi sejati.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0C121E] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <Clock className="w-4 h-4" /> 3. Time &amp; Price Alignment (Killzones)
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Analisis waktu memprioritaskan sesi London Open (02:00–05:00 EST) dan New York AM (09:30–11:30 EST),
              serta jendela Silver Bullet yang memiliki volatilitas teratur.
            </p>
          </div>

          <div className="p-5 rounded-lg bg-[#0C121E] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> 4. PD Arrays &amp; FVG Mitigasi
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Penggunaan Fair Value Gaps (FVG), Inversion FVG, dan Order Blocks di zona Discount (untuk pembelian)
              atau Premium (untuk penjualan) berdasarkan equilibrium range 50%.
            </p>
          </div>
        </div>
      </div>

      {/* Analytical Boundaries & Rigorous Disclaimer */}
      <div className="border border-red-950/80 bg-[#120B0D] rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-sm">
          <AlertOctagon className="w-5 h-5 text-red-500" />
          <span>Batasan Analisis &amp; Penafian Tanggung Jawab (Risk Disclaimer)</span>
        </div>
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
          <p>
            <strong>1. Bukan Nasihat Keuangan:</strong> Seluruh materi publikasi, visualisasi grafik, dan evaluasi
            statistik yang disajikan di situs ini ditujukan semata-mata untuk tujuan dokumentasi penelitian mandiri
            dan edukasi metodologis. Tidak ada bagian dari publikasi ini yang boleh dianggap sebagai saran investasi,
            rekomendasi beli/jual, atau arahan portofolio.
          </p>
          <p>
            <strong>2. Tidak Ada Layanan Sinyal Komersial:</strong> KAI RESEARCH tidak menjual sinyal trading otomatis,
            keanggotaan VIP berbayar, atau skema pengembalian modal. Model penelitian ini adalah sarana evaluasi terbuka.
          </p>
          <p>
            <strong>3. Risiko Kerugian Modal:</strong> Perdagangan produk derivatif, kontrak berjangka (Futures),
            valuta asing (Forex), dan komoditas mengandung tingkat risiko yang tinggi. Kinerja pengujian historis
            (backtesting) tidak menjamin hasil perdagangan di masa mendatang. Pengguna bertanggung jawab penuh atas
            keputusan modal mereka sendiri.
          </p>
        </div>
      </div>

      {/* Contact & Social Channels */}
      <div className="border border-slate-800 bg-[#0C121E] rounded-xl p-6 sm:p-8 space-y-6 font-mono text-xs">
        <div className="border-b border-slate-800/80 pb-3">
          <h2 className="text-lg font-bold text-white">Hubungi &amp; Saluran Publikasi</h2>
          <p className="text-slate-400 mt-1">
            Untuk korespondensi riset, diskusi teknikal metodologi ICT, atau pertanyaan dokumentasi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#080C14] border border-slate-800 flex items-center gap-3">
            <Mail className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-slate-400 text-[10px]">Email Riset Resmi:</div>
              <div className="text-slate-200 font-semibold">contact@kairesearch.io</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#080C14] border border-slate-800 flex items-center gap-3">
            <Send className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-slate-400 text-[10px]">Telegram Research Desk:</div>
              <div className="text-slate-200 font-semibold">@kai_research_lab</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#080C14] border border-slate-800 flex items-center gap-3">
            <Globe className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-slate-400 text-[10px]">X (Twitter) Publikasi:</div>
              <div className="text-slate-200 font-semibold">@KaiResearchICT</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#080C14] border border-slate-800 flex items-center gap-3">
            <Code2 className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <div className="text-slate-400 text-[10px]">Kode Sumber &amp; Build:</div>
              <div className="text-slate-200 font-semibold">github.com/kai-research</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
