import React from "react";
import Link from "next/link";
import { ShieldCheck, GitBranch, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#080C14] text-slate-400 text-xs font-mono mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-teal-400 rounded-full" />
              <span className="font-bold text-slate-100 text-sm tracking-wider">KAI RESEARCH</span>
            </div>
            <p className="text-slate-300 text-xs italic">
              &ldquo;Market structure first. Evidence over prediction.&rdquo;
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              Analisis struktur pasar, liquidity, displacement, dan price delivery dengan skenario yang
              terdokumentasi dan dapat dievaluasi secara objektif. Mengedepankan data empiris di atas spekulasi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Struktur Publikasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  01. Home
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-teal-400 transition-colors">
                  02. Folder: Analysis
                </Link>
              </li>
              <li>
                <Link href="/outlook" className="hover:text-teal-400 transition-colors">
                  03. Folder: Outlook
                </Link>
              </li>
              <li>
                <Link href="/backtesting" className="hover:text-teal-400 transition-colors">
                  04. Folder: Backtesting
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-teal-400 transition-colors">
                  05. Folder: Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  06. About &amp; Profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Methodology */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Prinsip Analisis
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-teal-400">&#8226;</span> ICT Price Delivery Framework
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-teal-400">&#8226;</span> Dual-Scenario Documentation
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-teal-400">&#8226;</span> Invalidation Level First
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-teal-400">&#8226;</span> Zero Hype / No Profit Claims
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border border-slate-800/80 bg-[#0B0F17] rounded-lg p-4 mb-8 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Batasan Analisis &amp; Penafian Risiko (Risk Disclaimer)</span>
          </div>
          <p>
            Semua konten, skenario, grafik, dan evaluasi statistik di KAI RESEARCH dipublikasikan semata-mata untuk
            tujuan riset teknikal dan dokumentasi edukasi independen. KAI RESEARCH tidak menyediakan sinyal trading,
            rekomendasi investasi, atau pengelolaan dana. Aktivitas trading instrumen finansial (Futures, Forex,
            Komoditas, dan Aset Digital) memiliki risiko kehilangan modal yang signifikan. Evaluasi historis bukan
            jaminan performa di masa depan.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-teal-400" />
            <span>&copy; 2026 KAI RESEARCH. Seluruh hak cipta dilindungi.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-slate-400" /> Commit Verifiable Builds
            </span>
            <span>Independent Terminal UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
