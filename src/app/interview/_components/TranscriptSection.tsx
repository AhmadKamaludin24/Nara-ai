import { TranscriptMessage } from "@/hooks/use-vapi";
import { RefObject } from "react";

interface TranscriptSectionProps {
  transcripts: TranscriptMessage[];
  activeTranscript: string | null;
  isActive: boolean;
  transcriptEndRef: RefObject<HTMLDivElement | null>;
}

export function TranscriptSection({
  transcripts,
  activeTranscript,
  isActive,
  transcriptEndRef,
}: TranscriptSectionProps) {
  return (
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

      {transcripts.map((msg, i) => (
        <TranscriptBubble key={i} message={msg} />
      ))}

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

      <div ref={transcriptEndRef} />
    </div>
  );
}

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
