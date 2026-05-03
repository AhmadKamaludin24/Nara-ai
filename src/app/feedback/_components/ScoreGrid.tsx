interface ScoreGridProps {
  komunikasi: number;
  teknikal: number;
  kepercayaanDiri: number;
}

export function ScoreGrid({
  komunikasi,
  teknikal,
  kepercayaanDiri,
}: ScoreGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Komunikasi */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <span className="font-black uppercase tracking-tighter text-xl">
            Komunikasi
          </span>
          <span className="material-symbols-outlined text-3xl">forum</span>
        </div>
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-6xl font-black tabular-nums tracking-tighter">
            {komunikasi}
          </span>
          <span className="text-xl font-bold opacity-50 mb-2">/100</span>
        </div>
        <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
          <div
            className="h-full bg-accent-red transition-all duration-1000"
            style={{ width: `${komunikasi}%` }}
          />
        </div>
      </div>

      {/* Teknikal */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <span className="font-black uppercase tracking-tighter text-xl">
            Teknikal
          </span>
          <span className="material-symbols-outlined text-3xl">code</span>
        </div>
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-6xl font-black tabular-nums tracking-tighter">
            {teknikal}
          </span>
          <span className="text-xl font-bold opacity-50 mb-2">/100</span>
        </div>
        <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
          <div
            className="h-full bg-blue-500 transition-all duration-1000"
            style={{ width: `${teknikal}%` }}
          />
        </div>
      </div>

      {/* Kepercayaan Diri */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <span className="font-black uppercase tracking-tighter text-xl leading-tight">
            Kepercayaan
            <br />
            Diri
          </span>
          <span className="material-symbols-outlined text-3xl">psychology</span>
        </div>
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-6xl font-black tabular-nums tracking-tighter">
            {kepercayaanDiri}
          </span>
          <span className="text-xl font-bold opacity-50 mb-2">/100</span>
        </div>
        <div className="w-full bg-surface-container-high h-2 border border-black mt-2">
          <div
            className="h-full bg-green-500 transition-all duration-1000"
            style={{ width: `${kepercayaanDiri}%` }}
          />
        </div>
      </div>
    </div>
  );
}
