"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createVapiClient, buildNaraSystemPrompt, NARA_ASSISTANT_CONFIG, type InterviewConfig } from "@/lib/vapi";
import type Vapi from "@vapi-ai/web";

// ─── Types ───────────────────────────────────────────────────────────
export type VapiStatus = "idle" | "connecting" | "active" | "ending";

export interface TranscriptMessage {
  role: "assistant" | "user";
  text: string;
  timestamp: number;
  isFinal: boolean;
}

interface UseVapiReturn {
  status: VapiStatus;
  isMuted: boolean;
  volumeLevel: number;
  transcripts: TranscriptMessage[];
  activeTranscript: string | null;
  startCall: (config: InterviewConfig) => Promise<void>;
  endCall: () => void;
  toggleMute: () => void;
  elapsedSeconds: number;
  error: string | null;
}

// ─── Hook ────────────────────────────────────────────────────────────
export function useVapi(maxDuration: number = 60): UseVapiReturn {
  const [status, setStatus] = useState<VapiStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([]);
  const [activeTranscript, setActiveTranscript] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const maxDurationRef = useRef(maxDuration);
  useEffect(() => {
    maxDurationRef.current = maxDuration;
  }, [maxDuration]);

  // Initialize Vapi instance once
  useEffect(() => {
    let vapiInstance: Vapi | null = null;

    const initVapi = async () => {
      try {
        const vapi = await createVapiClient();
        vapiRef.current = vapi;
        vapiInstance = vapi;

        // ── Event listeners ──
        vapi.on("call-start", () => {
          setStatus("active");
          setError(null);
          const start = Date.now();
          timerRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - start) / 1000);
            setElapsedSeconds(elapsed);
            
            // Batas maksimal sesuai quota trial
            if (elapsed >= maxDurationRef.current) {
              vapi.stop();
              setStatus("idle");
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
            }
          }, 1000);
        });

        vapi.on("call-end", () => {
          setStatus("idle");
          setVolumeLevel(0);
          setActiveTranscript(null);
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        });

        vapi.on("volume-level", (level: number) => {
          setVolumeLevel(level);
        });

        vapi.on("message", (message: Record<string, unknown>) => {
          if (message.type === "transcript") {
            const role = message.role as "assistant" | "user";
            const text = message.transcript as string;
            const transcriptType = message.transcriptType as string;

            if (transcriptType === "partial") {
              setActiveTranscript(text);
            } else if (transcriptType === "final") {
              setActiveTranscript(null);
              setTranscripts((prev) => [
                ...prev,
                { role, text, timestamp: Date.now(), isFinal: true },
              ]);
            }
          }
        });

        vapi.on("error", (err: any) => {
          console.error("[NaraAI] Vapi error:", err);
          setStatus("idle");
          const msg = err?.message || String(err);
          setError(msg);
        });
      } catch (err) {
        console.warn(err);
      }
    };

    initVapi();

    return () => {
      if (vapiInstance) {
        vapiInstance.stop();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ── Start call using dynamic assistant config ──
  const startCall = useCallback(async (config: InterviewConfig) => {
    const vapi = vapiRef.current;
    if (!vapi) {
      console.error(
        "[NaraAI] Vapi not initialized. Check NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env.local"
      );
      return;
    }

    setStatus("connecting");
    setTranscripts([]);
    setElapsedSeconds(0);

    try {
      // Build dynamic system prompt
      const systemPrompt = buildNaraSystemPrompt(config);
      
      // Inject the prompt into a copy of the assistant config
      const assistantConfig = {
        ...NARA_ASSISTANT_CONFIG,
        model: {
          ...NARA_ASSISTANT_CONFIG.model,
          messages: [
            {
              role: "system" as const,
              content: systemPrompt,
            },
          ],
        },
      };

      await vapi.start(assistantConfig);
    } catch (err) {
      console.error("[NaraAI] Failed to start call:", err);
      setStatus("idle");
    }
  }, []);

  const endCall = useCallback(() => {
    setStatus("ending");
    vapiRef.current?.stop();
  }, []);

  const toggleMute = useCallback(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;
    const next = !isMuted;
    vapi.setMuted(next);
    setIsMuted(next);
  }, [isMuted]);

  return {
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
  };
}
