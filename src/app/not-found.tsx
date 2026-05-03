"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NaraLogo } from "@/components/ui/NaraLogo";

const GLITCH_CHARS = ["4", "0", "4", "!", "?", "#", "@", "X", "0", "4"];

function GlitchNumber({ char, delay = 0 }: { char: string; delay?: number }) {
  const [display, setDisplay] = useState(char);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 8) {
        setDisplay(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
        count++;
      } else {
        setDisplay(char);
        clearInterval(interval);
        // Repeat glitch randomly
        setTimeout(() => {
          count = 0;
          const again = setInterval(() => {
            if (count < 6) {
              setDisplay(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]);
              count++;
            } else {
              setDisplay(char);
              clearInterval(again);
            }
          }, 60);
        }, 3000 + Math.random() * 2000);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [char]);

  return <span style={{ animationDelay: `${delay}ms` }}>{display}</span>;
}

export default function NotFound() {
  return (
    <div className="min-h-screen w-screen bg-surface flex flex-col selection:bg-primary-container overflow-hidden relative">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative torn corner top-right */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD600] border-b-4 border-l-4 border-black"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
      />
      <div className="absolute top-4 right-4 font-black text-xs uppercase tracking-widest text-black rotate-45 translate-x-4 -translate-y-1">
        ERROR
      </div>


      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b-4 border-black bg-white">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <NaraLogo size={40} />
          <span className="font-black text-xl uppercase tracking-tighter">NARA.AI</span>
        </Link>
        <Link
          href="/dashboard"
          className="bg-black text-white font-black uppercase text-xs tracking-widest px-5 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:bg-[#FFD600] hover:text-black transition-colors"
        >
          Dashboard
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">

        {/* Giant 404 */}
        <div className="relative mb-8">
          {/* Shadow layer */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#FFD600]" aria-hidden="true" />
          <div className="relative bg-black text-white px-8 py-4 border-4 border-black">
            <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter tabular-nums">
              <GlitchNumber char="4" delay={0} />
              <GlitchNumber char="0" delay={200} />
              <GlitchNumber char="4" delay={400} />
            </h1>
          </div>
        </div>

        {/* Message */}
        <div className="max-w-2xl space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
            Sepertinya halaman yang kamu cari sudah dipindahkan, dihapus,
            atau mungkin tidak pernah ada sejak awal.
          </p>
        </div>

        {/* Error detail badge */}
        <div className="inline-flex items-center gap-2 bg-black text-white border-4 border-black px-4 py-2 font-mono text-sm mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span>ERROR_CODE: PAGE_NOT_FOUND — HTTP 404</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-[#FFD600] text-black font-black uppercase tracking-tight text-base px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Kembali ke Beranda
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-black font-black uppercase tracking-tight text-base px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            Buka Dashboard
          </Link>
        </div>

        {/* Fun side note */}
        <p className="mt-12 text-xs text-zinc-400 font-medium uppercase tracking-widest">
          Nara AI juga bingung kamu nyasar ke mana 😅
        </p>
      </main>
    </div>
  );
}
