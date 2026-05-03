"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NaraLogo } from "@/components/ui/NaraLogo";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

interface InterviewData {
  id: string;
  role: string;
  level: string;
  overallScore: number;
  communication: number;
  technical: number;
  confidence: number;
  feedbackInsight: string;
  strengths: string[] | null;
  weaknesses: string[] | null;
  createdAt: string;
  user?: {
    name: string;
  };
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-black uppercase text-xs tracking-widest">{label}</span>
        <span className="font-black text-lg">{value}<span className="text-xs text-zinc-400 font-medium">/100</span></span>
      </div>
      <div className="h-4 bg-surface border-4 border-black relative overflow-hidden">
        <div
          className="h-full border-r-4 border-black transition-all duration-1000"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── Share Panel ───────────────────────────────────────────────────────────────

function SharePanel({ id, role, score }: { id: string; role: string; score: number }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/f/${id}` : `/f/${id}`;

  const shareText = `Saya baru saja menyelesaikan simulasi interview AI untuk posisi ${role} di NARA.AI dan mendapat skor ${score}/100! 🎯\n\nCoba latih kemampuan interview kamu juga 👇`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleShare = (platform: "twitter" | "linkedin" | "whatsapp") => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <div className="bg-black text-white p-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-[#FFD600]">share</span>
        <h3 className="font-black uppercase tracking-widest text-sm">Bagikan Hasil Ini</h3>
      </div>

      {/* Copy link */}
      <div className="p-4 border-b-4 border-black">
        <p className="font-black uppercase text-xs tracking-widest text-zinc-500 mb-3">Salin Link</p>
        <div className="flex gap-2">
          <div className="flex-1 bg-surface border-4 border-black px-3 py-2 font-mono text-xs truncate text-zinc-600">
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 border-4 border-black font-black uppercase text-xs tracking-wide transition-all shrink-0 ${
              copied
                ? "bg-green-400 text-black shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-[#FFD600] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            }`}
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check</span>
                Tersalin!
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
                Salin
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Social buttons */}
      <div className="p-4">
        <p className="font-black uppercase text-xs tracking-widest text-zinc-500 mb-3">Bagikan ke</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleShare("twitter")}
            className="flex items-center gap-2 bg-black text-white border-4 border-black px-4 py-2 font-black uppercase text-xs tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter / X
          </button>
          <button
            onClick={() => handleShare("linkedin")}
            className="flex items-center gap-2 bg-[#0A66C2] text-white border-4 border-black px-4 py-2 font-black uppercase text-xs tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="flex items-center gap-2 bg-[#25D366] text-white border-4 border-black px-4 py-2 font-black uppercase text-xs tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function PublicFeedbackClient({ id }: { id: string }) {
  const [data, setData] = useState<InterviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/f/${id}`)
      .then((res) => {
        if (res.status === 404) { setNotFound(true); setIsLoading(false); return null; }
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((d) => { if (d) { setData(d); setIsLoading(false); } })
      .catch(() => { setNotFound(true); setIsLoading(false); });
  }, [id]);

  if (isLoading) return <LoadingScreen fullScreen message="Memuat hasil interview..." />;

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-8 text-center">
        <NaraLogo size={64} />
        <h1 className="text-4xl font-black uppercase tracking-tighter mt-6 mb-2">Hasil Tidak Ditemukan</h1>
        <p className="text-on-surface-variant font-medium mb-8">Link ini sudah tidak valid atau sudah dihapus.</p>
        <Link href="/" className="bg-black text-white font-black uppercase px-8 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:opacity-80 transition-opacity">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  if (!data) return null;

  const scoreColor = data.overallScore >= 85 ? "#4ade80" : data.overallScore >= 65 ? "#FFD600" : "#f87171";

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container">
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-20 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <NaraLogo size={36} />
          <span className="font-black text-lg uppercase tracking-tighter hidden sm:block">NARA.AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden sm:block">Hasil Interview Publik</span>
          <Link
            href="/interview"
            className="bg-[#FFD600] text-black border-4 border-black px-4 py-2 font-black uppercase text-xs tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            Coba Juga!
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12 space-y-6 md:space-y-8">
        {/* Hero score card */}
        <div className="bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#FFD600] text-black font-black text-xs uppercase px-3 py-1 border-2 border-[#FFD600]">
                  {data.level.toUpperCase()}
                </span>
                <span className="text-zinc-400 text-xs font-medium uppercase">
                  {new Date(data.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">{data.role}</h1>
              {data.user?.name && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FFD600] text-[18px]">person</span>
                  <p className="text-[#FFD600] font-black uppercase tracking-wider text-sm">{data.user.name}</p>
                </div>
              )}
              <p className="text-zinc-400 font-medium mt-1">Simulasi Interview AI oleh NARA.AI</p>
            </div>
            <div className="text-right shrink-0">
              <div
                className="text-7xl font-black leading-none"
                style={{ color: scoreColor }}
              >
                {data.overallScore}
              </div>
              <div className="text-zinc-400 text-sm font-bold uppercase tracking-widest">/ 100</div>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-5">
          <h2 className="font-black uppercase tracking-widest border-b-4 border-black pb-3 text-sm">Rincian Skor</h2>
          <ScoreBar label="Komunikasi" value={data.communication} color="#60a5fa" />
          <ScoreBar label="Teknikal" value={data.technical} color="#FFD600" />
          <ScoreBar label="Kepercayaan Diri" value={data.confidence} color="#4ade80" />
        </div>

        {/* AI Insight */}
        {data.feedbackInsight && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-black text-white p-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFD600] text-[20px]">psychology</span>
              <h2 className="font-black uppercase tracking-widest text-sm">Evaluasi AI Nara</h2>
            </div>
            <div className="p-6">
              <p className="text-zinc-700 font-medium leading-relaxed">{data.feedbackInsight}</p>
            </div>
          </div>
        )}

        {/* Strengths & Weaknesses */}
        {(data.strengths?.length || data.weaknesses?.length) ? (
          <div className="grid sm:grid-cols-2 gap-6">
            {data.strengths && data.strengths.length > 0 && (
              <div className="bg-green-50 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5">
                <h3 className="font-black uppercase text-sm tracking-widest mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">thumb_up</span>
                  Kekuatan
                </h3>
                <ul className="space-y-2">
                  {data.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium">
                      <span className="text-green-600 font-black shrink-0">✓</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.weaknesses && data.weaknesses.length > 0 && (
              <div className="bg-red-50 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5">
                <h3 className="font-black uppercase text-sm tracking-widest mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 text-[18px]">trending_up</span>
                  Area Perbaikan
                </h3>
                <ul className="space-y-2">
                  {data.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-medium">
                      <span className="text-red-600 font-black shrink-0">→</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* Share panel */}
        <SharePanel id={id} role={data.role} score={data.overallScore} />

        {/* CTA */}
        <div className="text-center pb-8 border-b-4 border-black mb-8">
          <p className="text-zinc-500 font-medium mb-4">Ingin latihan interview juga?</p>
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 bg-[#FFD600] text-black font-black uppercase tracking-tight text-lg px-10 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">mic</span>
            Coba NARA.AI Gratis
          </Link>
          <p className="text-xs text-zinc-400 font-medium mt-3 uppercase tracking-wider">
            Tidak perlu kartu kredit • Langsung mulai
          </p>
        </div>

        {/* Credit */}
        <div className="text-center pb-12">
          <div className="inline-block bg-black text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,214,0,1)]">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Created & Developed by</span><br/>
            <a 
              href="https://github.com/AhmadKamaludin24" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-black uppercase tracking-wider hover:text-[#FFD600] transition-colors"
            >
              Ahmad Kamaludin
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
