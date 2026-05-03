interface ConnectionStatusProps {
  status: "idle" | "connecting" | "active" | "ending";
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  const isActive = status === "active";
  const isConnecting = status === "connecting";

  return (
    <div className="flex items-center gap-6 bg-surface-container-high border-4 border-black px-6 py-3 shadow-brutal">
      <div className="flex flex-col items-end">
        <span className="text-[10px] font-black uppercase tracking-tighter leading-none mb-1">
          Status Koneksi
        </span>
        <div className="flex gap-1.5 items-end h-6">
          {[2, 3, 4, 5, 6].map((h, i) => (
            <div
              key={i}
              className={`w-3 border border-black ${
                isActive && i < 4 ? "bg-black" : "bg-white border-2"
              }`}
              style={{ height: `${h * 4}px` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-style-label-bold text-[12px] uppercase">
          {isActive ? "Terhubung" : isConnecting ? "Menghubungkan" : "Offline"}
        </span>
        <span className="text-[10px] font-mono opacity-60">
          {isActive ? "VAPI_STREAM" : "STANDBY"}
        </span>
      </div>
    </div>
  );
}
