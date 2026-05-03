interface StatsGridProps {
  totalInterviews: number;
  avgScore: number;
  practiceHours: number;
}

export function StatsGrid({
  totalInterviews,
  avgScore,
  practiceHours,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      {/* Card 1 — Total Interviews */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal-blue flex flex-col justify-between">
        <div className="flex justify-between items-start mb-8">
          <span className="material-symbols-outlined text-[40px] text-text-main">
            forum
          </span>
          <span className="text-style-label-bold bg-primary-container border-2 border-black px-2 py-1 uppercase">
            Semua
          </span>
        </div>
        <div>
          <p className="text-style-label-bold text-on-surface-variant uppercase mb-2">
            Total Interview
          </p>
          <p className="text-style-h1 text-text-main">{totalInterviews}</p>
        </div>
      </div>

      {/* Card 2 — Avg Score */}
      <div className="bg-primary-container border-4 border-black p-6 shadow-brutal-blue flex flex-col justify-between">
        <div className="flex justify-between items-start mb-8">
          <span className="material-symbols-outlined text-[40px] text-text-main">
            military_tech
          </span>
          <span className="text-style-label-bold bg-white border-2 border-black px-2 py-1 uppercase">
            AVG
          </span>
        </div>
        <div>
          <p className="text-style-label-bold text-on-surface-variant uppercase mb-2">
            Rata-Rata Skor
          </p>
          <p className="text-style-h1 text-text-main">{avgScore}/100</p>
        </div>
      </div>

      {/* Card 3 — Practice Hours */}
      <div className="bg-white border-4 border-black p-6 shadow-brutal-blue flex flex-col justify-between">
        <div className="flex justify-between items-start mb-8">
          <span className="material-symbols-outlined text-[40px] text-text-main">
            timer
          </span>
          <span className="text-style-label-bold bg-tertiary-container border-2 border-black px-2 py-1 uppercase">
            Minggu Ini
          </span>
        </div>
        <div>
          <p className="text-style-label-bold text-on-surface-variant uppercase mb-2">
            Jam Latihan
          </p>
          <p className="text-style-h1 text-text-main">{practiceHours}</p>
        </div>
      </div>
    </div>
  );
}
