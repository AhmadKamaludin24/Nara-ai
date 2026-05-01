"use client";

import { useRef, useEffect } from "react";
import type { VapiStatus } from "@/hooks/use-vapi";

const BAR_COUNT = 9;
const IDLE_DELAYS = [0.1, 0.3, 0.2, 0.5, 0.4, 0.6, 0.2, 0.8, 0.3];
const IDLE_HEIGHTS = [30, 47, 64, 31, 48, 65, 32, 49, 66];

interface AudioVisualizerProps {
  status: VapiStatus;
  volumeLevel: number; // 0–1 from Vapi
  onStartCall: () => void;
}

export default function AudioVisualizer({
  status,
  volumeLevel,
  onStartCall,
}: AudioVisualizerProps) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isActive = status === "active";
  const isConnecting = status === "connecting";
  const isIdle = status === "idle";

  // Drive bar heights from Vapi's volumeLevel when active
  useEffect(() => {
    if (!isActive) return;

    // Distribute the single volume level across bars with variation
    // to make it look like a real spectrum analyzer
    const multipliers = [0.5, 0.7, 1.0, 0.8, 1.2, 0.9, 0.6, 1.1, 0.75];

    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = barRefs.current[i];
      if (!bar) continue;

      const baseLevel = volumeLevel * multipliers[i];
      // Add slight per-bar randomness for organic feel
      const jitter = Math.random() * 0.08;
      const level = Math.min(baseLevel + jitter, 1);
      const pct = 8 + level * 82; // 8%–90%

      bar.style.height = `${pct}%`;
    }
  }, [volumeLevel, isActive]);

  // Reset bars when going idle
  useEffect(() => {
    if (isIdle || isConnecting) {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barRefs.current[i];
        if (bar) {
          bar.style.height = `${IDLE_HEIGHTS[i]}%`;
        }
      }
    }
  }, [isIdle, isConnecting]);

  const statusLabel = (() => {
    switch (status) {
      case "connecting":
        return "Menghubungkan ke Nara...";
      case "active":
        return "Sesi Aktif — Berbicara...";
      case "ending":
        return "Mengakhiri Sesi...";
      default:
        return "Klik untuk Mulai Interview";
    }
  })();

  const statusDotColor = isActive ? "bg-green-400" : "bg-white";

  return (
    <div className="relative">
      {/* Circle container */}
      <div className="w-[360px] h-[360px] bg-white border-4 border-border-primary rounded-full shadow-brutal-lg relative overflow-hidden flex items-center justify-center gap-2 px-12">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barRefs.current[i] = el;
            }}
            className={[
              "w-4 bg-secondary-container border-2 border-black",
              isActive
                ? "opacity-100 transition-[height] duration-[120ms] ease-out"
                : "opacity-0 transition-opacity duration-300",
            ].join(" ")}
            style={{
              height: isActive ? "8%" : `${IDLE_HEIGHTS[i]}%`,
            }}
          />
        ))}

        {/* Overlay — click to start when idle */}
        {(isIdle || isConnecting) && (
          <button
            onClick={isIdle ? onStartCall : undefined}
            disabled={isConnecting}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 hover:bg-black/5 transition-colors cursor-pointer z-10 group rounded-full disabled:cursor-wait"
            aria-label="Mulai sesi interview"
          >
            <span className="material-symbols-outlined text-5xl text-text-main/30 group-hover:text-text-main/70 group-hover:scale-110 transition-all mb-2">
              {isConnecting ? "hourglass_top" : "play_arrow"}
            </span>
            <span className="text-style-label-bold uppercase text-text-main/40 group-hover:text-text-main/80 transition-colors text-center px-8">
              {isConnecting
                ? "Menghubungkan..."
                : "Klik untuk Mulai Interview"}
            </span>
          </button>
        )}
      </div>

      {/* Status Badge */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-secondary-container text-white border-4 border-border-primary px-8 py-2 shadow-brutal flex items-center gap-3 z-20">
        <span className="relative flex h-3 w-3">
          <span
            className={`absolute inline-flex h-full w-full rounded-full ${statusDotColor} ${isActive ? "animate-ping" : ""
              } opacity-75`}
          />
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${statusDotColor}`}
          />
        </span>
        <span className="text-style-label-bold uppercase tracking-widest italic">
          {statusLabel}
        </span>
      </div>
    </div>
  );
}
