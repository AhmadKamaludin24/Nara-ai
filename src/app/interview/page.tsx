"use client";

import { useVapi, type TranscriptMessage } from "@/hooks/use-vapi";
import type { InterviewConfig } from "@/lib/vapi";
import AudioVisualizer from "./_components/AudioVisualizer";
import OnboardingForm from "./_components/OnboardingForm";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Helper: format seconds to MM:SS ──
function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function InterviewPage() {
  const router = useRouter();
  const [config, setConfig] = useState<InterviewConfig | null>(null);
  const [showTranscript, setShowTranscript] = useState(true);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

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
  } = useVapi();

  // Auto-scroll transcript when new messages arrive
  useEffect(() => {
    if (showTranscript && transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts, activeTranscript, showTranscript]);

  const isActive = status === "active";
  const isConnecting = status === "connecting";

  // Redirect to feedback on call end
  useEffect(() => {
    if (isActive) {
      hasStarted.current = true;
    } else if (hasStarted.current && status === "idle") {
      // Store transcript data for feedback generation
      localStorage.setItem("nara_interview_data", JSON.stringify({
        transcripts,
        config
      }));
      router.push("/feedback");
    }
  }, [status, isActive, router, transcripts, config]);

  if (!config) {
    return (
      <div className="h-screen w-screen overflow-y-auto bg-surface bg-dot-pattern selection:bg-primary-container">
        <OnboardingForm onSubmit={setConfig} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col selection:bg-primary-container selection:text-text-main bg-surface">
      {/* Header */}
      <header className="flex justify-between items-center h-20 px-8 border-b-4 border-border-primary bg-background-main shrink-0 z-30 relative">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`w-4 h-4 rounded-full border-2 border-black ${isActive
                ? "bg-accent-red animate-pulse"
                : "bg-gray-300"
                }`}
            />
            <span className="text-style-h3 text-text-main tracking-tighter italic font-black uppercase">
              NARA.AI
            </span>
          </div>
          <div className="h-8 w-1 bg-border-primary" />
          <div
            className={`flex items-center border-4 border-border-primary px-4 py-1 shadow-brutal rotate-1 ${isActive
              ? "bg-primary-container"
              : "bg-surface-container-high"
              }`}
          >
            <span className="text-style-label-bold uppercase tracking-tighter text-black">
              {isActive
                ? "REC // SESI AKTIF"
                : isConnecting
                  ? "MENGHUBUNGKAN..."
                  : "SIAP MEMULAI"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white border-4 border-border-primary px-6 py-2 shadow-brutal -rotate-1">
            <span className="material-symbols-outlined text-text-main font-bold">
              timer
            </span>
            <span className="text-style-h2 text-text-main tracking-tight tabular-nums">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
          <button
            onClick={endCall}
            disabled={!isActive}
            className="bg-accent-red text-on-primary border-4 border-border-primary px-8 py-3 flex items-center gap-2 text-style-label-bold uppercase tracking-widest shadow-brutal press-effect-lg hover:-translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span className="material-symbols-outlined font-bold">
              call_end
            </span>
            Akhiri Sesi
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Center Avatar Area */}
        <div className="flex-1 flex items-center justify-center relative bg-surface-container-lowest bg-dot-pattern">
          {/* Large AI Interaction Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Dynamic Pulse Visual */}
            <div className={`absolute inset-0 -m-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
              <div
                className={`w-[500px] h-[500px] rounded-full border-4 border-secondary-container/20 ${isActive ? "animate-pulse-ring" : ""
                  }`}
              />
              <div
                className={`absolute w-[440px] h-[440px] rounded-full border-4 border-secondary-container/40 ${isActive ? "animate-pulse-ring" : ""
                  }`}
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Avatar Frame with Vapi-driven Audio Visualizer */}
            <AudioVisualizer
              status={status}
              volumeLevel={volumeLevel}
              onStartCall={() => {
                if (config) {
                  startCall(config);
                }
              }}
            />
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-10 left-10 p-4 border-2 border-border-primary/20 font-mono text-xs opacity-50 select-none">
            LATENCY: &lt;600ms
            <br />
            PROVIDER: VAPI
            <br />
            MODEL: GPT-4o
          </div>
          <div className="absolute bottom-10 right-10 p-4 border-2 border-border-primary/20 font-mono text-xs opacity-50 select-none text-right">
            ENCRYPTION: AES-256
            <br />
            CODEC: OPUS_VOICE
            <br />
            ID: NRA-{elapsedSeconds.toString().padStart(4, "0")}
          </div>
        </div>

        {/* Transcript & Controls Area */}
        <div className={`bg-surface-container border-t-4 border-border-primary flex flex-col z-20 relative transition-all duration-300 ${showTranscript ? "h-2/5 min-h-[340px]" : ""}`}>
          {/* Floating Section Label */}
          {showTranscript && (
            <div className="absolute -top-6 left-12 bg-black text-white px-4 py-1 border-2 border-black text-style-label-bold text-[12px] uppercase">
              TRANSKRIP LANGSUNG
            </div>
          )}

          {/* Transcript Bubbles */}
          {showTranscript && (
            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-6 bg-white/40">
              {transcripts.length === 0 && !activeTranscript && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-on-surface-variant text-style-body-lg italic text-center max-w-2xl">
                    {isActive
                      ? "Menunggu percakapan dimulai..."
                      : "Klik tombol play di atas untuk memulai sesi interview dengan Nara."}
                  </p>
                </div>
              )}

              {/* Finalized transcripts */}
              {transcripts.map((msg, i) => (
                <TranscriptBubble key={i} message={msg} />
              ))}

              {/* Active partial transcript */}
              {activeTranscript && (
                <div className="flex justify-end max-w-4xl ml-auto">
                  <div className="flex flex-row-reverse gap-4 items-start">
                    <div className="w-12 h-12 shrink-0 bg-primary-container border-4 border-black shadow-brutal flex items-center justify-center">
                      <span className="material-symbols-outlined text-black">
                        person
                      </span>
                    </div>
                    <div className="bg-primary-container/60 border-4 border-border-primary/60 p-6 shadow-brutal relative rounded-none">
                      <div className="absolute top-4 -right-2 w-4 h-4 bg-primary-container/60 border-r-4 border-t-4 border-border-primary/60 rotate-45" />
                      <p className="text-style-transcript text-text-main italic opacity-70">
                        {activeTranscript}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Invisible div for auto-scrolling */}
              <div ref={transcriptEndRef} />
            </div>
          )}

          {/* Bottom Controls */}
          <div className="border-t-4 border-border-primary bg-white p-6 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMute}
                disabled={!isActive}
                className={`w-16 h-16 border-4 border-border-primary flex items-center justify-center shadow-brutal press-effect-lg transition-all group disabled:opacity-40 disabled:cursor-not-allowed ${isMuted
                  ? "bg-accent-red text-white"
                  : "bg-white hover:bg-surface-container-low"
                  }`}
              >
                <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
                  {isMuted ? "mic_off" : "mic"}
                </span>
              </button>
              <button
                disabled={!isActive}
                className="w-16 h-16 bg-white border-4 border-border-primary flex items-center justify-center shadow-brutal press-effect-lg hover:bg-surface-container-low transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-text-main text-3xl group-hover:scale-110 transition-transform">
                  volume_up
                </span>
              </button>
              <div className="h-10 w-1 bg-border-primary mx-2" />
              <button
                onClick={() => setShowTranscript((prev) => !prev)}

                className="px-8 h-16 bg-primary-container border-4 border-border-primary flex items-center justify-center gap-3 shadow-brutal press-effect-lg hover:-translate-y-1 transition-all group text-style-label-bold text-text-main uppercase disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined font-bold">
                  {showTranscript ? "subtitles_off" : "subtitles"}
                </span>
                {showTranscript ? "Sembunyikan Caption" : "Tampilkan Caption"}
              </button>
            </div>
            <div className="flex items-center gap-6 bg-surface-container-high border-4 border-black px-6 py-3 shadow-brutal">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-tighter leading-none mb-1">
                  Status Koneksi
                </span>
                <div className="flex gap-1.5 items-end h-6">
                  {[2, 3, 4, 5, 6].map((h, i) => (
                    <div
                      key={i}
                      className={`w-3 border border-black ${isActive && i < 4
                        ? "bg-black"
                        : "bg-white border-2"
                        }`}
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-style-label-bold text-[12px] uppercase">
                  {isActive
                    ? "Terhubung"
                    : isConnecting
                      ? "Menghubungkan"
                      : "Offline"}
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  {isActive ? "VAPI_STREAM" : "STANDBY"}
                </span>
              </div>
            </div>
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
