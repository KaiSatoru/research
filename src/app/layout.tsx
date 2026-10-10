import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAI RESEARCH — Independent Market Research | ICT Methodology",
  description:
    "Market structure first. Evidence over prediction. Analisis struktur pasar, liquidity, displacement, dan price delivery dengan skenario yang terdokumentasi dan dapat dievaluasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F17] text-[#F8FAFC]">
        <AuthProvider>
          <Suspense fallback={<div className="h-16 sm:h-20 border-b border-slate-800 bg-[#0B0F17]" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full">
            <Suspense fallback={<div className="text-center py-20 text-slate-500 font-mono text-xs">Memuat halaman...</div>}>
              {children}
            </Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
