"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { TranscriptMessage } from "@/hooks/use-vapi";
import { calculateInterviewScore } from "@/lib/scoring";
import Link from "next/link";

interface FeedbackData {
  komunikasi: number;
  teknikal: number;
  kepercayaanDiri: number;
  insight: string;
}

import { LoadingState } from "./_components/LoadingState";
import { FeedbackHeader } from "./_components/FeedbackHeader";
import { ScoreGrid } from "./_components/ScoreGrid";
import { InsightCard } from "./_components/InsightCard";

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
  const [savedId, setSavedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const savingRef = useRef(false);

  useEffect(() => {
    const loadFeedback = async () => {
      // CASE 1: Fetching existing interview from DB
      if (interviewId) {
        try {
          const res = await fetch(`/api/interview/${interviewId}`);
          if (!res.ok) throw new Error("Failed to fetch");
          const interview = await res.json();
          
          setSavedId(interviewId);
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

      if (savingRef.current) return;
      savingRef.current = true;

      const parsed = JSON.parse(raw);
      setCandidateName(parsed.config.candidateName);
      setRoleName(parsed.config.role);

      const msgs = parsed.transcripts as TranscriptMessage[];
      
      const scoring = calculateInterviewScore(
        msgs, 
        parsed.config.candidateName, 
        parsed.config.role
      );

      const result: FeedbackData = {
        komunikasi: scoring.komunikasi,
        teknikal: scoring.teknikal,
        kepercayaanDiri: scoring.kepercayaanDiri,
        insight: scoring.insight,
      };

      try {
        const saveRes = await fetch("/api/interview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: parsed.config.role,
            level: parsed.config.level,
            topic: parsed.config.topic || "Technical",
            overallScore: scoring.overall,
            communication: scoring.komunikasi,
            technical: scoring.teknikal,
            confidence: scoring.kepercayaanDiri,
            feedbackInsight: scoring.insight,
            transcripts: msgs.map(m => ({ role: m.role, message: m.text })),
            elapsedSeconds: parsed.elapsedSeconds || 0
          }),
        });
        
        if (saveRes.ok) {
          const saved = await saveRes.json();
          setSavedId(saved.id);
          localStorage.removeItem("nara_interview_data");
        }
      } catch (err) {
        console.error("Failed to save interview:", err);
        savingRef.current = false;
      }

      setTimeout(() => {
        setFeedback(result);
        setIsLoading(false);
      }, 3500);
    };

    loadFeedback();
  }, [router, interviewId]);

  if (isLoading) return <LoadingState />;
  if (!feedback) return null;

  const publicUrl = savedId ? `${window.location.origin}/f/${savedId}` : null;

  const handleCopy = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen w-screen overflow-y-auto bg-surface bg-dot-pattern selection:bg-primary-container p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-4xl flex flex-col gap-6 md:gap-8 mt-4 md:mt-10">
        
        <FeedbackHeader candidateName={candidateName} roleName={roleName} />

        <ScoreGrid 
          komunikasi={feedback.komunikasi}
          teknikal={feedback.teknikal}
          kepercayaanDiri={feedback.kepercayaanDiri}
        />

        <InsightCard insight={feedback.insight} />

        {/* ── Share Panel ── */}
        {publicUrl && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-black text-white p-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#FFD600]">share</span>
              <h3 className="font-black uppercase tracking-widest text-sm">Bagikan Hasil Ini</h3>
            </div>
            <div className="p-4 border-b-4 border-black">
              <p className="font-black uppercase text-xs tracking-widest text-zinc-500 mb-3">Link Publik (Tanpa Login)</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-surface border-4 border-black px-3 py-2 font-mono text-xs truncate text-zinc-600">{publicUrl}</div>
                <button onClick={handleCopy} className={`px-4 py-2 border-4 border-black font-black uppercase text-xs tracking-wide transition-all shrink-0 ${ copied ? "bg-green-400 text-black" : "bg-[#FFD600] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none" }`}>
                  {copied ? "✓ Tersalin!" : "Salin"}
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="font-black uppercase text-xs tracking-widest text-zinc-500 mb-3">Bagikan ke</p>
              <div className="flex flex-wrap gap-3">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Saya dapat skor ${feedback.komunikasi + feedback.teknikal + feedback.kepercayaanDiri}/300 di simulasi interview AI NARA.AI untuk posisi ${roleName}! 🎯`)}&url=${encodeURIComponent(publicUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-black text-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  Twitter / X
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0A66C2] text-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  LinkedIn
                </a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`Saya dapat skor di simulasi interview AI NARA.AI! Cek hasilnya: ${publicUrl}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white border-4 border-black px-4 py-2 font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
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
