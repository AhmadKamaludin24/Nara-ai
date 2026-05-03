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
    <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
      <button
        onClick={onToggleMute}
        disabled={!isActive}
        className={`w-14 h-14 md:w-16 md:h-16 shrink-0 border-4 border-border-primary flex items-center justify-center shadow-brutal press-effect-lg transition-all group disabled:opacity-40 disabled:cursor-not-allowed ${
          isMuted ? "bg-accent-red text-white" : "bg-white hover:bg-surface-container-low"
        }`}
      >
        <span className="material-symbols-outlined text-2xl md:text-3xl group-hover:scale-110 transition-transform">
          {isMuted ? "mic_off" : "mic"}
        </span>
      </button>
      <button
        disabled={!isActive}
        className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-white border-4 border-border-primary flex items-center justify-center shadow-brutal press-effect-lg hover:bg-surface-container-low transition-all group disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-text-main text-2xl md:text-3xl group-hover:scale-110 transition-transform">
          volume_up
        </span>
      </button>
      <div className="h-10 w-1 bg-border-primary mx-1 md:mx-2 shrink-0" />
      <button
        onClick={onToggleTranscript}
        className="px-4 md:px-8 h-14 md:h-16 bg-primary-container border-4 border-border-primary flex items-center justify-center gap-2 md:gap-3 shadow-brutal press-effect-lg hover:-translate-y-1 transition-all group text-style-label-bold text-text-main uppercase whitespace-nowrap"
      >
        <span className="material-symbols-outlined font-bold text-xl md:text-2xl">
          {showTranscript ? "subtitles_off" : "subtitles"}
        </span>
        <span className="hidden sm:inline">
          {showTranscript ? "Sembunyikan Caption" : "Tampilkan Caption"}
        </span>
        <span className="sm:hidden">Caption</span>
      </button>
    </div>
  );
}
