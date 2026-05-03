interface InterviewHeaderProps {
  status: "idle" | "connecting" | "active" | "ending";
  elapsedTime: string;
  onEndCall: () => void;
}

export function InterviewHeader({
  status,
  elapsedTime,
  onEndCall,
}: InterviewHeaderProps) {
  const isActive = status === "active";
  const isConnecting = status === "connecting";

  return (
    <header className="flex flex-col md:flex-row justify-between items-center h-auto md:h-20 px-4 md:px-8 py-4 md:py-0 border-b-4 border-border-primary bg-background-main shrink-0 z-30 relative gap-4 md:gap-0">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 w-full md:w-auto">
        <div className="flex items-center gap-2">
          <span
            className={`w-4 h-4 rounded-full border-2 border-black ${
              isActive ? "bg-accent-red animate-pulse" : "bg-gray-300"
            }`}
          />
          <span className="text-style-h3 text-text-main tracking-tighter italic font-black uppercase">
            NARA.AI
          </span>
        </div>
        <div className="hidden md:block h-8 w-1 bg-border-primary" />
        <div
          className={`flex items-center border-4 border-border-primary px-3 md:px-4 py-1 shadow-brutal md:rotate-1 ${
            isActive ? "bg-primary-container" : "bg-surface-container-high"
          }`}
        >
          <span className="text-style-label-bold uppercase tracking-tighter text-black text-xs md:text-sm">
            {isActive
              ? "REC // SESI AKTIF"
              : isConnecting
              ? "MENGHUBUNGKAN..."
              : "SIAP MEMULAI"}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 md:gap-6 w-full md:w-auto">
        <div className="flex items-center gap-2 md:gap-3 bg-white border-4 border-border-primary px-4 md:px-6 py-1.5 md:py-2 shadow-brutal -rotate-1">
          <span className="material-symbols-outlined text-text-main font-bold text-xl md:text-2xl">
            timer
          </span>
          <span className="text-xl md:text-style-h2 text-text-main tracking-tight tabular-nums font-bold">
            {elapsedTime}
          </span>
        </div>
        <button
          onClick={onEndCall}
          disabled={!isActive}
          className="bg-accent-red text-on-primary border-4 border-border-primary px-4 md:px-8 py-2 md:py-3 flex items-center gap-2 text-style-label-bold uppercase tracking-widest shadow-brutal press-effect-lg hover:-translate-y-1 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          <span className="material-symbols-outlined font-bold text-lg md:text-xl">call_end</span>
          <span className="hidden md:inline">Akhiri Sesi</span>
          <span className="md:hidden">Akhiri</span>
        </button>
      </div>
    </header>
  );
}
