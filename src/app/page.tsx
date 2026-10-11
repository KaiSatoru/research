import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiveHeroAtmosphere } from "@/components/LiveHeroAtmosphere";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden bg-[#0B0F17]">
      {/* Full Background Anime Image (Monokrom + Slow Cinematic Breathing) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-right-bottom bg-no-repeat select-none pointer-events-none transition-all duration-300 animate-slow-breathe"
        style={{
          backgroundImage: "url('/images/hero-anime.png')",
          filter: "grayscale(100%) contrast(125%) brightness(0.80)",
        }}
      />

      {/* Atmospheric Live Sparks & Thunder Aura */}
      <LiveHeroAtmosphere />

      {/* Teal Accent Glow on Character Lightning */}
      <div className="absolute right-0 bottom-0 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

      {/* Dark Navy Overlay Gradient to preserve crystal-clear text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/85 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-transparent to-[#0B0F17]/60 pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative w-full z-10 font-mono">
        <div className="max-w-2xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111A29]/90 border border-slate-700/80 text-teal-300 text-xs shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="tracking-wider">INDEPENDENT MARKET RESEARCH</span>
          </div>

          {/* Main Headline from Image 1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md">
            Market Structure. <br />
            Liquidity. <span className="text-teal-400">Price Delivery.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl drop-shadow">
            Technical analysis and ICT methodology to understand market dynamics and find
            high-probability opportunities. Evaluasi struktur berbasis bukti tanpa ramalan spekulatif.
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <Link
              href="/analysis"
              className="px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl shadow-teal-500/20 group"
            >
              <span>Explore Analysis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/outlook"
              className="px-5 py-3 rounded-lg bg-[#0E1522]/90 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all backdrop-blur-sm"
            >
              Market Outlook
            </Link>
          </div>
        </div>

        {/* Bottom Right Quotation from Image 1 */}
        <div className="hidden md:block absolute right-8 bottom-4 text-right font-mono pointer-events-none select-none">
          <p className="text-sm lg:text-base font-semibold text-slate-200 tracking-wide">
            Better analysis.
          </p>
          <p className="text-sm lg:text-base font-semibold text-teal-400 tracking-wide">
            Better decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
