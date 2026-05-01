"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TranscriptMessage } from "@/hooks/use-vapi";
import Link from "next/link";

interface FeedbackData {
  komunikasi: number;
  teknikal: number;
  kepercayaanDiri: number;
  insight: string;
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-surface bg-dot-pattern">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <FeedbackContent />
    </Suspense>
  );
}

function FeedbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("id");
  
  const [isLoading, setIsLoading] = useState(true);
  const [candidateName, setCandidateName] = useState("Kandidat");
  const [roleName, setRoleName] = useState("");
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const savingRef = useRef(false);

  useEffect(() => {
    const loadFeedback = async () => {
      // CASE 1: Fetching existing interview from DB
      if (interviewId) {
        try {
          const res = await fetch(`/api/interview/${interviewId}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const interview = await res.json();
          
          setRoleName(interview.role);
          setFeedback({
            komunikasi: interview.communication,
            teknikal: interview.technical,
            kepercayaanDiri: interview.confidence,
            insight: interview.feedbackInsight,
          });
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(err);
          router.push("/dashboard");
          return;
        }
      }

      // CASE 2: New interview, generate and save
      const raw = localStorage.getItem("nara_interview_data");
      if (!raw) {
        router.push("/dashboard");
        return;
      }

      // Prevent double execution
      if (savingRef.current) return;
      savingRef.current = true;

      const parsed = JSON.parse(raw);
      setCandidateName(parsed.config.candidateName);
      setRoleName(parsed.config.role);

      // Simulate AI Feedback Generation
      const msgs = parsed.transcripts as TranscriptMessage[];
      const userMsgs = msgs.filter((m) => m.role === "user");

      const baseScore = Math.min(60 + userMsgs.length * 5, 95);
      const isShort = userMsgs.length < 3;

      const result: FeedbackData = {
        komunikasi: isShort ? 65 : Math.min(baseScore + Math.floor(Math.random() * 10), 98),
        teknikal: isShort ? 60 : Math.min(baseScore - 5 + Math.floor(Math.random() * 15), 95),
        kepercayaanDiri: isShort ? 70 : Math.min(baseScore + 2 + Math.floor(Math.random() * 8), 99),
        insight: isShort
          ? "Sesi wawancara terlalu singkat untuk memberikan penilaian menyeluruh. Cobalah untuk lebih aktif berinteraksi dan menjelaskan pengalamanmu secara lebih rinci."
          : `Kerja bagus, ${parsed.config.candidateName}! Kamu menunjukkan pemahaman yang cukup baik untuk posisi ${parsed.config.role}. Penjelasanmu terstruktur, namun ada ruang untuk lebih mendalami konsep teknis secara spesifik. Terus pertahankan rasa percaya dirimu!`,
      };

      // Save to database
      try {
        const saveRes = await fetch("/api/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: parsed.config.role,
            level: parsed.config.level,
            topic: parsed.config.topic || "Technical",
            overallScore: Math.round((result.komunikasi + result.teknikal + result.kepercayaanDiri) / 3),
            communication: result.komunikasi,
            technical: result.teknikal,
            confidence: result.kepercayaanDiri,
            feedbackInsight: result.insight,
            transcripts: msgs.map(m => ({ role: m.role, message: m.text }))
          }),
        });
        
        if (saveRes.ok) {
          localStorage.removeItem("nara_interview_data");
        }
      } catch (err) {
        console.error("Failed to save interview:", err);
        savingRef.current = false; // Allow retry on error if needed
      }

      // Small delay for effect
      setTimeout(() => {
        setFeedback(result);
        setIsLoading(false);
      }, 3500);
    };

    loadFeedback();
  }, [router, interviewId]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-surface bg-dot-pattern selection:bg-primary-container">
        <div className="flex flex-col items-center gap-6 p-12 bg-white border-4 border-black shadow-brutal max-w-lg w-full text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Menganalisa Sesi</h2>
            <p className="text-on-surface-variant text-sm font-medium">Nara.AI sedang memproses transkrip dan merumuskan feedback untukmu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="min-h-screen w-screen overflow-y-auto bg-surface bg-dot-pattern selection:bg-primary-container p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl flex flex-col gap-8 mt-10">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b-4 border-black pb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
                EVALUATION REPORT
              </span>
              <span className="text-style-label-bold uppercase opacity-60">NARA.AI</span>
            </div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mt-2">
              Hasil Interview
            </h1>
            <p className="text-lg font-medium">
              Kandidat: <span className="font-bold">{candidateName}</span> — {roleName}
            </p>
          </div>
          <Link 
            href="/dashboard"
            className="border-4 border-black bg-white px-6 py-3 font-bold uppercase text-sm shadow-brutal hover:-translate-y-1 hover:bg-primary-container transition-all"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Komunikasi */}
          <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <span className="font-black uppercase tracking-tighter text-xl">Komunikasi</span>
              <span className="material-symbols-outlined text-3xl">forum</span>
            </div>
            <div className="flex items-end gap-2 mt-auto">
              <span className="text-6xl font-black tabular-nums tracking-tighter">{feedback.komunikasi}</span>
              <span className="text-xl font-bold opacity-50 mb-2">/100</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
              <div 
                className="h-full bg-accent-red transition-all duration-1000" 
                style={{ width: `${feedback.komunikasi}%` }} 
              />
            </div>
          </div>

          {/* Teknikal */}
          <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <span className="font-black uppercase tracking-tighter text-xl">Teknikal</span>
              <span className="material-symbols-outlined text-3xl">code</span>
            </div>
            <div className="flex items-end gap-2 mt-auto">
              <span className="text-6xl font-black tabular-nums tracking-tighter">{feedback.teknikal}</span>
              <span className="text-xl font-bold opacity-50 mb-2">/100</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
              <div 
                className="h-full bg-blue-500 transition-all duration-1000" 
                style={{ width: `${feedback.teknikal}%` }} 
              />
            </div>
          </div>

          {/* Kepercayaan Diri */}
          <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <span className="font-black uppercase tracking-tighter text-xl leading-tight">Kepercayaan<br/>Diri</span>
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <div className="flex items-end gap-2 mt-auto">
              <span className="text-6xl font-black tabular-nums tracking-tighter">{feedback.kepercayaanDiri}</span>
              <span className="text-xl font-bold opacity-50 mb-2">/100</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
              <div 
                className="h-full bg-green-500 transition-all duration-1000" 
                style={{ width: `${feedback.kepercayaanDiri}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="bg-primary-container border-4 border-black p-8 shadow-brutal mt-4 relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-brutal rotate-[-10deg]">
            <span className="material-symbols-outlined font-black">lightbulb</span>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 ml-6">AI Insight</h2>
          <p className="text-lg font-medium leading-relaxed">
            {feedback.insight}
          </p>
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-center">
          <Link 
            href="/interview"
            className="bg-black text-white border-4 border-black px-10 py-4 font-black uppercase tracking-widest text-xl hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(255,100,100,1)] transition-all"
          >
            Lakukan Interview Lagi
          </Link>
        </div>

      </div>
    </div>
  );
}
