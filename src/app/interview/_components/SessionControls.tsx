interface SessionControlsProps {
  isActive: boolean;
  isMuted: boolean;
  showTranscript: boolean;
  onToggleMute: () => void;
  onToggleTranscript: () => void;
}

export function SessionControls({
  isActive,
  isMuted,
  showTranscript,
  onToggleMute,
  onToggleTranscript,
}: SessionControlsProps) {
  return (
    <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 w-full md:w-auto">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onToggleMute}
          disabled={!isActive}
          className={`w-12 h-12 md:w-16 md:h-16 shrink-0 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group disabled:opacity-40 disabled:cursor-not-allowed ${
            isMuted ? "bg-accent-red text-white" : "bg-white hover:bg-zinc-50"
          }`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <span className="material-symbols-outlined text-xl md:text-3xl group-hover:scale-110 transition-transform">
            {isMuted ? "mic_off" : "mic"}
          </span>
        </button>
        <button
          disabled={!isActive}
          className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-zinc-50 transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
          title="Adjust Volume"
        >
          <span className="material-symbols-outlined text-black text-xl md:text-3xl group-hover:scale-110 transition-transform">
            volume_up
          </span>
        </button>
      </div>

      <div className="h-8 md:h-10 w-1 bg-black mx-1 md:mx-2 shrink-0" />

      <button
        onClick={onToggleTranscript}
        className={`flex-1 md:flex-none px-4 md:px-8 h-12 md:h-16 border-4 border-black flex items-center justify-center gap-2 md:gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group text-[11px] md:text-sm font-black uppercase tracking-wider whitespace-nowrap ${
          showTranscript ? "bg-black text-white" : "bg-[#FFD600] text-black"
        }`}
      >
        <span className="material-symbols-outlined font-bold text-lg md:text-2xl">
          {showTranscript ? "subtitles_off" : "subtitles"}
        </span>
        <span>
          {showTranscript ? "Hide" : "Transcript"}
        </span>
      </button>
    </div>
  );
}
