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
    <header className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8 border-b-4 border-black bg-background-main shrink-0 z-30 relative">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-black ${
              isActive ? "bg-accent-red animate-pulse" : "bg-gray-300"
            }`}
          />
          <span className="text-lg md:text-xl text-black italic font-black uppercase tracking-tighter hidden sm:block">
            NARA.AI
          </span>
        </div>
        <div className="hidden md:block h-8 w-1 bg-black" />
        <div
          className={`flex items-center border-2 md:border-4 border-black px-2 md:px-4 py-0.5 md:py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal md:rotate-1 ${
            isActive ? "bg-[#FFD600]" : "bg-zinc-100"
          }`}
        >
          <span className="text-[10px] md:text-sm font-black uppercase tracking-tighter text-black">
            {isActive
              ? "LIVE"
              : isConnecting
              ? "CONNECTING"
              : "READY"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-2 bg-white border-2 md:border-4 border-black px-3 md:px-6 py-1 md:py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal -rotate-1">
          <span className="material-symbols-outlined text-black font-bold text-lg md:text-2xl">
            timer
          </span>
          <span className="text-lg md:text-2xl text-black tracking-tight tabular-nums font-black">
            {elapsedTime}
          </span>
        </div>
        <button
          onClick={onEndCall}
          disabled={!isActive}
          className="bg-accent-red text-white border-2 md:border-4 border-black px-3 md:px-8 py-1 md:py-3 flex items-center gap-2 text-[10px] md:text-sm font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined font-bold text-base md:text-xl">call_end</span>
          <span className="hidden md:inline">End Session</span>
          <span className="md:hidden">End</span>
        </button>
      </div>
    </header>
  );
}
