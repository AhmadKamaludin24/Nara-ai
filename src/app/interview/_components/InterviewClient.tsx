"use client";

import { useVapi, type TranscriptMessage } from "@/hooks/use-vapi";
import type { InterviewConfig } from "@/lib/vapi";
import AudioVisualizer from "./AudioVisualizer";
import OnboardingForm from "./OnboardingForm";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

// ── Helper: format seconds to MM:SS ──
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

import { InterviewHeader } from "./InterviewHeader";
import { TranscriptSection } from "./TranscriptSection";
import { SessionControls } from "./SessionControls";
import { ConnectionStatus } from "./ConnectionStatus";

export default function InterviewClient({ initialTrialSeconds }: { initialTrialSeconds: number }) {
  const router = useRouter();
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  
  const [trialSeconds] = useState<number>(initialTrialSeconds);

  const {
    status,
    isMuted,
    volumeLevel,
    transcripts,
    activeTranscript,
    startCall,
    endCall,
    toggleMute,
    elapsedSeconds,
    error,
  } = useVapi(trialSeconds);

  useEffect(() => {
    if (error) {
      console.error("[InterviewPage] Redirecting due to error:", error);
      router.push(`/interview/error?message=${encodeURIComponent(error)}`);
    }
  }, [error, router]);

  useEffect(() => {
    if (showTranscript && transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts, activeTranscript, showTranscript]);

  const isActive = status === "active";

  useEffect(() => {
    if (isActive) {
      hasStarted.current = true;
    } else if (hasStarted.current && status === "idle" && !error) {
      localStorage.setItem("nara_interview_data", JSON.stringify({
        transcripts,
        config,
        elapsedSeconds
      }));
      router.push("/feedback");
    }
  }, [status, isActive, router, transcripts, config, elapsedSeconds, error]);

  const isModelActive = process.env.NEXT_PUBLIC_VAPI_STATUS !== "INACTIVE";

  if (!isModelActive) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-surface flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-text-main">
        <div className="max-w-2xl w-full bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="material-symbols-outlined text-[64px] text-red-500 mb-4">
              block
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">Model Nonaktif</h2>
            <p className="text-zinc-600 font-bold mb-8">
              Maaf, kuota token model AI saat ini sedang habis atau tidak tersedia. Silakan cek kembali nanti.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-black text-white font-black uppercase text-sm tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-surface bg-dot-pattern selection:bg-primary-container">
        <OnboardingForm onSubmit={setConfig} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col selection:bg-primary-container selection:text-text-main bg-surface">
      <InterviewHeader
        status={status}
        elapsedTime={formatTime(Math.max(0, (trialSeconds || 60) - elapsedSeconds))}
        onEndCall={endCall}
      />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 flex items-center justify-center relative bg-surface-container-lowest bg-dot-pattern">
          <div className="relative z-10 flex flex-col items-center">
            <div className={`absolute inset-0 -m-10 md:-m-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
              <div className={`w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-4 border-secondary-container/20 ${isActive ? "animate-pulse-ring" : ""}`} />
              <div className={`absolute w-[260px] h-[260px] md:w-[440px] md:h-[440px] rounded-full border-4 border-secondary-container/40 ${isActive ? "animate-pulse-ring" : ""}`} style={{ animationDelay: "0.5s" }} />
            </div>

            <AudioVisualizer
              status={status}
              volumeLevel={volumeLevel}
              onStartCall={() => config && startCall(config)}
            />
          </div>

          <div className="absolute top-10 left-10 p-4 border-2 border-border-primary/20 font-mono text-xs opacity-50 select-none">
            LATENCY: &lt;600ms<br />PROVIDER: VAPI<br />MODEL: GPT-4o
          </div>
          <div className="absolute bottom-10 right-10 p-4 border-2 border-border-primary/20 font-mono text-xs opacity-50 select-none text-right">
            ENCRYPTION: AES-256<br />CODEC: OPUS_VOICE<br />ID: NRA-{elapsedSeconds.toString().padStart(4, "0")}
          </div>
        </div>

        <div className={`bg-surface-container border-t-4 border-border-primary flex flex-col z-20 relative transition-all duration-300 ${showTranscript ? "h-2/5 min-h-[340px]" : ""}`}>
          {showTranscript && (
            <>
              <div className="absolute -top-6 left-12 bg-black text-white px-4 py-1 border-2 border-black text-style-label-bold text-[12px] uppercase">
                TRANSKRIP LANGSUNG
              </div>
              <TranscriptSection
                transcripts={transcripts}
                activeTranscript={activeTranscript}
                isActive={isActive}
                transcriptEndRef={transcriptEndRef}
              />
            </>
          )}

          <div className="border-t-4 border-border-primary bg-white p-4 md:p-6 flex flex-col md:flex-row gap-4 justify-between items-center shrink-0">
            <SessionControls
              isActive={isActive}
              isMuted={isMuted}
              showTranscript={showTranscript}
              onToggleMute={toggleMute}
              onToggleTranscript={() => setShowTranscript(prev => !prev)}
            />
            <ConnectionStatus status={status} />
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Transcript Bubble Component ──────────────────────────────────────
function TranscriptBubble({ message }: { message: TranscriptMessage }) {
  const isAssistant = message.role === "assistant";

  if (isAssistant) {
    return (
      <div className="flex justify-start max-w-4xl">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 shrink-0 bg-secondary-container border-4 border-black shadow-brutal flex items-center justify-center">
            <span className="material-symbols-outlined text-white">
              smart_toy
            </span>
          </div>
          <div className="bg-white border-4 border-border-primary p-6 shadow-brutal-lg relative rounded-none">
            <div className="absolute top-4 -left-2 w-4 h-4 bg-white border-l-4 border-b-4 border-border-primary rotate-45" />
            <p className="text-style-transcript text-text-main leading-relaxed">
              &ldquo;{message.text}&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end max-w-4xl ml-auto">
      <div className="flex flex-row-reverse gap-4 items-start">
        <div className="w-12 h-12 shrink-0 bg-primary-container border-4 border-black shadow-brutal flex items-center justify-center">
          <span className="material-symbols-outlined text-black">person</span>
        </div>
        <div className="bg-primary-container border-4 border-border-primary p-6 shadow-brutal-lg relative rounded-none">
          <div className="absolute top-4 -right-2 w-4 h-4 bg-primary-container border-r-4 border-t-4 border-border-primary rotate-45" />
          <p className="text-style-transcript text-text-main leading-relaxed">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}
