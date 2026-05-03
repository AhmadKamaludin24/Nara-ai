"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InterviewErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "Terjadi kesalahan pada sesi interview kamu.";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface p-6 selection:bg-primary-container">
      <div className="max-w-3xl w-full bg-white border-4 border-black p-8 shadow-brutal-lg relative overflow-hidden">
        {/* Accent dots */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '12px 12px' }}
        />

        <div className="relative z-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-red border-4 border-black shadow-brutal mb-2 rotate-3">
            <span className="material-symbols-outlined text-white text-[48px]">warning</span>
          </div>

          <div>
            <h1 className="text-style-h1 text-black uppercase mb-4 leading-none">Sesi Terputus</h1>
            <p className="text-style-body-lg text-zinc-600 font-medium leading-relaxed">
              {message.includes("Meeting ended due to ejection")
                ? "Sesi interview kamu terputus secara tiba-tiba (ejection). Ini biasanya terjadi karena masalah koneksi atau server Vapi."
                : message}
            </p>
          </div>

          <div className="p-4 bg-zinc-50 border-2 border-black border-dashed text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Error Detail</p>
            <p className="text-xs font-mono text-zinc-600 break-words">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 bg-white text-black font-black uppercase text-sm py-4 border-4 border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Ke Dashboard
            </button>
            <button
              onClick={() => router.push("/interview")}
              className="flex-1 bg-black text-white font-black uppercase text-sm py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterviewErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center font-black uppercase">Loading...</div>}>
      <InterviewErrorContent />
    </Suspense>
  );
}
