"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog, DialogVariant } from "../ui/Dialog";

export function Hero() {
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    desc: string;
    variant: DialogVariant;
  }>({
    open: true,
    title: "TOKEN EXPIRED",
    desc: "maaf token anda sudah expired, silakan login/register kembali untuk melanjutkan.",
    variant: "error",
  });


  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkError = () => {
      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");

      if (err === "TOKEN_EXPIRED") {
        setError(err);
      }
    };

    checkError();
  }, [error]);

  return (
    <section className="relative bg-background-main border-b-4 border-black overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — Copy */}
          <div className="space-y-8 w-full">
            <div className="inline-flex items-center bg-primary-container border-[3px] border-black px-4 py-1.5 shadow-brutal rotate-[-1deg]">
              <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse mr-2" />
              <span className="text-style-label-bold uppercase tracking-tight text-black">
                AI Voice Interview — Real-Time
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-style-h1 text-text-main uppercase leading-[1.05] font-black">
              Latihan
              <br />
              Interview
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Tanpa Batas</span>
                <span className="absolute bottom-1 left-0 w-full h-3 md:h-4 bg-primary-container -z-0 -rotate-1" />
              </span>
            </h1>

            <p className="text-base md:text-style-body-lg text-on-surface-variant max-w-2xk">
              Bicara langsung dengan <strong>Nara</strong>, AI interviewer yang
              memahami konteks dan memberikan feedback real-time. Tingkatkan
              skill interview kamu sebelum hari-H.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/interview"
                className="bg-[#0057FF] text-white border-4 border-black shadow-brutal text-lg md:text-style-h3 uppercase px-6 py-3 md:px-10 md:py-4 press-effect hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">
                  play_arrow
                </span>
                Coba Gratis
              </Link>
              <a
                href="#cara-kerja"
                className="bg-white text-text-main border-4 border-black shadow-brutal text-lg md:text-style-h3 uppercase px-6 py-3 md:px-10 md:py-4 press-effect hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-2xl">info</span>
                Pelajari
              </a>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
              <div className="flex -space-x-3">
                {[
                  "bg-blue-400",
                  "bg-yellow-400",
                  "bg-green-400",
                  "bg-pink-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-black ${color} flex items-center justify-center`}
                  >
                    <span className="material-symbols-outlined text-[14px] md:text-[16px] text-black">
                      person
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-style-label-bold text-text-main text-sm md:text-base">
                  2,500+ pengguna aktif
                </p>
                <p className="text-[10px] md:text-xs text-on-surface-variant">
                  Rata-rata skor naik 23% setelah 5 sesi
                </p>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative flex items-center justify-center pt-8 md:pt-0">
            {/* Large decorative circle */}
            <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] bg-white border-4 border-black rounded-full shadow-brutal-lg relative flex items-center justify-center overflow-hidden">
              {/* Static wave bars */}
              <div className="flex items-center justify-center gap-2 px-12 h-full">
                {[40, 65, 50, 80, 55, 75, 45, 60, 70].map((h, i) => (
                  <div
                    key={i}
                    className="wave-bar w-3 md:w-4 bg-secondary-container border-2 border-black"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.12}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-2 md:right-4 bg-primary-container border-[3px] border-black px-4 py-2 shadow-brutal rotate-3 z-20">
              <p className="text-style-label-bold uppercase text-black">
                Skor: 92/100
              </p>
            </div>

            <div className="absolute -bottom-4 -left-2 md:left-4 bg-white border-[3px] border-black px-4 py-2 shadow-brutal -rotate-2 z-20">
              <p className="text-style-label-bold uppercase text-black flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  trending_up
                </span>
                +23% improvement
              </p>
            </div>

            <div className="absolute top-1/2 -right-4 md:right-0 bg-secondary-container text-white border-[3px] border-black px-4 py-2 shadow-brutal rotate-1 z-20">
              <p className="text-style-label-bold uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  mic
                </span>
                Real-Time Voice
              </p>
            </div>
          </div>
        </div>
      </div>
      {error === "TOKEN_EXPIRED" && (
        <Dialog
          open={dialog.open}
          onClose={() => setDialog((prev) => ({ ...prev, open: false }))}
          title={dialog.title}
          description={dialog.desc}
          variant={dialog.variant}
        />
      )}
    </section>
  );
}
