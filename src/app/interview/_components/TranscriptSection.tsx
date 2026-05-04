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
    <div className="flex-1 overflow-y-auto p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-white/40">
      {transcripts.length === 0 && !activeTranscript && (
        <div className="flex items-center justify-center h-full">
          <p className="text-zinc-500 text-sm md:text-style-body-lg italic text-center max-w-2xl px-6">
            {isActive
              ? "Menunggu percakapan dimulai..."
              : "Klik tombol play di bawah untuk mulai."}
          </p>
        </div>
      )}

      {transcripts.map((msg, i) => (
        <TranscriptBubble key={i} message={msg} />
      ))}

      {activeTranscript && (
        <div className="flex justify-end max-w-4xl ml-auto">
          <div className="flex flex-row-reverse gap-2 md:gap-4 items-start">
            <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 bg-primary-container border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal flex items-center justify-center">
              <span className="material-symbols-outlined text-black text-sm md:text-xl">
                person
              </span>
            </div>
            <div className="bg-primary-container/60 border-2 md:border-4 border-black p-3 md:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal relative rounded-none">
              <div className="absolute top-3 -right-1.5 w-3 h-3 bg-primary-container/60 border-r-2 md:border-r-4 border-t-2 md:border-t-4 border-black rotate-45" />
              <p className="text-xs md:text-style-transcript text-text-main italic opacity-70">
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
        <div className="flex gap-2 md:gap-4 items-start">
          <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 bg-secondary-container border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm md:text-xl">
              smart_toy
            </span>
          </div>
          <div className="bg-white border-2 md:border-4 border-black p-3 md:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal-lg relative rounded-none">
            <div className="absolute top-3 -left-1.5 w-3 h-3 bg-white border-l-2 md:border-l-4 border-b-2 md:border-b-4 border-black rotate-45" />
            <p className="text-xs md:text-style-transcript text-text-main leading-relaxed">
              &ldquo;{message.text}&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end max-w-4xl ml-auto">
      <div className="flex flex-row-reverse gap-2 md:gap-4 items-start">
        <div className="w-8 h-8 md:w-12 md:h-12 shrink-0 bg-[#FFD600] border-2 md:border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal flex items-center justify-center">
          <span className="material-symbols-outlined text-black text-sm md:text-xl">person</span>
        </div>
        <div className="bg-[#FFD600] border-2 md:border-4 border-black p-3 md:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal-lg relative rounded-none">
          <div className="absolute top-3 -right-1.5 w-3 h-3 bg-[#FFD600] border-r-2 md:border-r-4 border-t-2 md:border-t-4 border-black rotate-45" />
          <p className="text-xs md:text-style-transcript text-text-main leading-relaxed">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}
