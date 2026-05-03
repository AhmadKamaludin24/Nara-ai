"use client";

import { useEffect, useState } from "react";
import { NaraLogo } from "./NaraLogo";

const LOADING_PHRASES = [
  "Menghubungkan ke Nara AI...",
  "Menyiapkan sesi interview...",
  "Memuat data performa...",
  "Sebentar ya, hampir siap...",
];

interface LoadingScreenProps {
  /** Full-screen overlay (default: false — inline block) */
  fullScreen?: boolean;
  /** Custom message to show below the animation */
  message?: string;
  /** Show cycling phrases instead of a fixed message */
  cycling?: boolean;
}

export function LoadingScreen({
  fullScreen = false,
  message,
  cycling = false,
}: LoadingScreenProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!cycling) return;
    const t = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % LOADING_PHRASES.length);
    }, 1800);
    return () => clearInterval(t);
  }, [cycling]);

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(t);
  }, []);

  const displayMessage = cycling
    ? LOADING_PHRASES[phraseIndex]
    : message ?? "Memuat...";

  const content = (
    <div className="flex flex-col items-center justify-center gap-8 select-none">
      {/* ── Animated Logo Mark ── */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating border */}
        <div className="absolute w-24 h-24 border-4 border-dashed border-[#FFD600] rounded-full animate-spin [animation-duration:3s]" />
        {/* Inner counter-rotating border */}
        <div className="absolute w-16 h-16 border-4 border-black rounded-full animate-spin [animation-duration:1.5s] [animation-direction:reverse]" />
        {/* Core logo */}
        <NaraLogo size={48} withBorder={false} />
      </div>

      {/* ── Bouncing Bars ── */}
      <div className="flex items-end gap-1.5 h-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 bg-black border border-black"
            style={{
              animation: `loadingBar 1s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              height: "100%",
            }}
          />
        ))}
      </div>

      {/* ── Message ── */}
      <div className="text-center">
        <p className="font-black uppercase text-sm tracking-widest text-black">
          {displayMessage}
          <span className="inline-block w-6 text-left">{".".repeat(dots)}</span>
        </p>
        <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mt-1">
          NARA.AI — Interview Simulator
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      {content}
    </div>
  );
}
