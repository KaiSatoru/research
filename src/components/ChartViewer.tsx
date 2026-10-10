"use client";

import React, { useState } from "react";
import { Maximize2, ZoomIn, ZoomOut, RotateCcw, X, ShieldAlert } from "lucide-react";

interface ChartViewerProps {
  type: "nq_reversal" | "eur_expansion" | "xau_sweep" | "btc_consolidation" | "silver_bullet_stats" | "smt_divergence_stats" | "fvg_drawdown_stats";
  title: string;
  subtitle?: string;
  instrument?: string;
  timeframe?: string;
}

export function ChartViewer({
  type,
  title,
  subtitle = "Klik grafik untuk membuka mode inspeksi resolusi tinggi (Lightbox Zoom)",
  instrument = "NQ1! E-MINI NASDAQ",
  timeframe = "15M CHART",
}: ChartViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.3, 2.8));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
  };

  // Render SVG based on chart type
  const renderChartGraphic = (isModal = false) => {
    return (
      <svg
        viewBox="0 0 1000 520"
        className="w-full h-auto select-none overflow-hidden"
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          transition: isModal ? "transform 0.15s ease-out" : "none",
          transform: isModal ? `scale(${scale})` : "none",
          transformOrigin: "center center",
        }}
      >
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B0F17" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id="fvgTealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.25)" />
            <stop offset="100%" stopColor="rgba(20, 184, 166, 0.08)" />
          </linearGradient>
          <linearGradient id="fvgRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.25)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.08)" />
          </linearGradient>
          <pattern id="chartGrid" width="60" height="40" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
          </pattern>
        </defs>

        {/* Background & Grid */}
        <rect width="1000" height="520" fill="url(#gridGrad)" />
        <rect width="1000" height="520" fill="url(#chartGrid)" />

        {/* Right Price Scale Axis */}
        <rect x="910" y="0" width="90" height="520" fill="#0D131F" stroke="#1E293B" strokeWidth="1" />
        <g fill="#64748B" fontSize="10" textAnchor="start">
          <text x="920" y="70">20,880.00</text>
          <text x="920" y="140">20,790.00</text>
          <text x="920" y="210">20,700.00</text>
          <text x="920" y="280">20,610.00</text>
          <text x="920" y="350">20,520.00</text>
          <text x="920" y="420">20,430.00</text>
          <text x="920" y="490">20,340.00</text>
        </g>

        {/* Bottom Time Axis */}
        <rect x="0" y="480" width="910" height="40" fill="#0D131F" stroke="#1E293B" strokeWidth="1" />
        <g fill="#64748B" fontSize="10" textAnchor="middle">
          <text x="140" y="504">02:00 (LON OPEN)</text>
          <text x="350" y="504">08:30 (NY MACRO)</text>
          <text x="560" y="504">09:30 (EQUITY OPEN)</text>
          <text x="750" y="504">10:00 (SILVER BULLET)</text>
        </g>

        {/* Session Shading: Asian / London */}
        <rect x="60" y="20" width="180" height="460" fill="rgba(30, 41, 59, 0.15)" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="4 4" />
        <text x="75" y="42" fill="#64748B" fontSize="10" fontWeight="bold">ASIAN RANGE CONSOLIDATION</text>

        {type === "nq_reversal" && (
          <>
            {/* Old Lows / Asian Low Sweep Line */}
            <line x1="80" y1="380" x2="620" y2="380" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="4 4" />
            <rect x="420" y="365" width="170" height="18" fill="#1E293B" rx="3" stroke="#EF4444" strokeWidth="0.8" />
            <text x="430" y="378" fill="#FCA5A5" fontSize="9.5" fontWeight="600">SSL SWEEP (Asian Low 20,540)</text>

            {/* Candlesticks sequence - Bearish Drop */}
            {/* Candle 1 (Asian High) */}
            <line x1="120" y1="210" x2="120" y2="310" stroke="#64748B" strokeWidth="1.2" />
            <rect x="114" y="230" width="12" height="60" fill="#1E293B" stroke="#64748B" strokeWidth="1" />

            {/* Candle 2 (London drop) */}
            <line x1="180" y1="260" x2="180" y2="350" stroke="#EF4444" strokeWidth="1.2" />
            <rect x="174" y="280" width="12" height="50" fill="#EF4444" />

            {/* Candle 3 (08:30 drop) */}
            <line x1="280" y1="300" x2="280" y2="390" stroke="#EF4444" strokeWidth="1.2" />
            <rect x="274" y="320" width="12" height="55" fill="#EF4444" />

            {/* Candle 4: The 09:30 Manipulative Sweep Candle */}
            <line x1="480" y1="320" x2="480" y2="440" stroke="#EF4444" strokeWidth="1.5" />
            <rect x="473" y="340" width="14" height="45" fill="#EF4444" />
            <circle cx="480" cy="435" r="4" fill="#EF4444" />
            <text x="495" y="440" fill="#F87171" fontSize="10">Judas Low (20,532)</text>

            {/* Candle 5 & 6: Aggressive Displacement Upwards (MSS) */}
            <line x1="550" y1="290" x2="550" y2="400" stroke="#14B8A6" strokeWidth="1.5" />
            <rect x="543" y="310" width="14" height="85" fill="#14B8A6" />

            <line x1="620" y1="180" x2="620" y2="330" stroke="#14B8A6" strokeWidth="1.5" />
            <rect x="613" y="190" width="14" height="120" fill="#14B8A6" />

            {/* Market Structure Shift (MSS) Indicator */}
            <line x1="460" y1="260" x2="650" y2="260" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="635" y="248" width="80" height="18" fill="#134E4A" rx="2" stroke="#2DD4BF" strokeWidth="1" />
            <text x="642" y="261" fill="#2DD4BF" fontSize="9.5" fontWeight="bold">MSS CONFIRMED</text>

            {/* Fair Value Gap (FVG) Shaded Box */}
            <rect x="613" y="280" width="220" height="50" fill="url(#fvgTealGrad)" stroke="#14B8A6" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="613" y1="305" x2="833" y2="305" stroke="#14B8A6" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="625" y="300" fill="#2DD4BF" fontSize="10" fontWeight="bold">15M BULLISH FVG (20,590 - 20,625)</text>
            <text x="625" y="322" fill="#94A3B8" fontSize="9">Consequent Encroachment 50%: 20,607.50</text>

            {/* Retracement Candle tapping FVG */}
            <line x1="710" y1="270" x2="710" y2="320" stroke="#64748B" strokeWidth="1.2" />
            <rect x="704" y="275" width="12" height="30" fill="#1E293B" stroke="#64748B" strokeWidth="1" />

            {/* Expansion Arrow to Buy-Side Liquidity Target */}
            <path d="M 720 290 Q 770 200 830 110" fill="none" stroke="#2DD4BF" strokeWidth="2.5" strokeDasharray="5 4" />
            <polygon points="830,110 820,122 835,124" fill="#2DD4BF" />

            {/* BSL Target Zone */}
            <line x1="60" y1="100" x2="900" y2="100" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="6 4" />
            <rect x="700" y="85" width="190" height="20" fill="#134E4A" rx="3" stroke="#2DD4BF" strokeWidth="1" />
            <text x="710" y="99" fill="#5EEAD4" fontSize="10" fontWeight="bold">TARGET: 4H BSL / PWH (20,845)</text>
          </>
        )}

        {type !== "nq_reversal" && (
          <>
            {/* Generic High Quality ICT Structure */}
            <line x1="80" y1="110" x2="880" y2="110" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="90" y="100" fill="#FCA5A5" fontSize="10" fontWeight="bold">BUY-SIDE LIQUIDITY (OLD HIGH POOL)</text>

            <line x1="80" y1="410" x2="880" y2="410" stroke="#14B8A6" strokeWidth="1.2" strokeDasharray="4 4" />
            <text x="90" y="428" fill="#5EEAD4" fontSize="10" fontWeight="bold">SELL-SIDE LIQUIDITY (OLD LOW POOL)</text>

            {/* Candles Wave */}
            <path d="M 100 350 L 250 120 L 380 320 L 520 180 L 680 390 L 840 220" fill="none" stroke="#334155" strokeWidth="1.5" />
            <rect x="360" y="240" width="160" height="60" fill="url(#fvgTealGrad)" stroke="#14B8A6" strokeWidth="1" strokeDasharray="2 2" />
            <text x="375" y="275" fill="#2DD4BF" fontSize="10" fontWeight="bold">INSTITUTIONAL DISCOUNT FVG</text>

            {/* Key Rejection Point */}
            <circle cx="680" cy="390" r="6" fill="#14B8A6" />
            <text x="695" y="395" fill="#2DD4BF" fontSize="10" fontWeight="bold">SWEEP & DISPLACEMENT TRIGGER</text>
          </>
        )}

        {/* Legend / Terminal Watermark */}
        <g transform="translate(30, 440)">
          <rect width="210" height="26" fill="#090D14" rx="3" stroke="#1E293B" strokeWidth="0.8" />
          <circle cx="15" cy="13" r="4" fill="#14B8A6" />
          <text x="26" y="17" fill="#94A3B8" fontSize="9">KAI RESEARCH · VERIFIED MODEL</text>
        </g>
      </svg>
    );
  };

  return (
    <>
      <div className="relative group border border-slate-800 bg-[#0B0F17] rounded-lg overflow-hidden transition-all duration-200 hover:border-slate-700">
        {/* Chart Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0e1420] border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono font-semibold text-slate-200 tracking-wider">{instrument}</span>
            <span className="text-slate-600">|</span>
            <span className="font-mono text-teal-400 bg-teal-950/60 border border-teal-800/60 px-1.5 py-0.5 rounded text-[10px]">
              {timeframe}
            </span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 rounded transition-colors"
            title="Buka Lightbox Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Perbesar Anotasi</span>
          </button>
        </div>

        {/* Interactive Chart Canvas View */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer overflow-hidden p-2 bg-[#090D14] flex items-center justify-center min-h-[300px]"
        >
          {renderChartGraphic(false)}

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-slate-900/90 border border-teal-500/40 text-teal-300 font-mono text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2">
              <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
              Klik untuk inspeksi detail harga & anotasi ICT
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 py-2 bg-[#0B0F17] border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="truncate">{title}</span>
          <span className="text-slate-500 hidden sm:inline">{subtitle}</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-150">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">{instrument}</span>
              <span className="text-teal-400 bg-teal-950 border border-teal-800 px-2 py-0.5 rounded text-[11px]">
                {timeframe}
              </span>
              <span className="text-slate-400 hidden md:inline">— {title}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 text-xs"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded border border-slate-700"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setScale(1);
                }}
                className="p-1.5 text-slate-300 hover:text-white bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 rounded ml-2"
                title="Tutup (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Chart Body */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-2 rounded-lg bg-[#080C14] border border-slate-800">
            <div className="max-w-5xl w-full">
              {renderChartGraphic(true)}
            </div>
          </div>

          {/* Modal Footer Note */}
          <div className="pt-3 mt-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
              <span>Anotasi: Level FVG, Invalidation Cutoff, dan Pool Likuiditas terdokumentasi untuk evaluasi objektif.</span>
            </div>
            <span className="text-slate-500">Tekan tombol silang atau klik di luar untuk menutup.</span>
          </div>
        </div>
      )}
    </>
  );
}
