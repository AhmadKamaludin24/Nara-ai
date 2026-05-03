"use client";

import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

type PerformanceData = {
  interviews: any[];
  metrics: {
    communication: number | null;
    technical: number | null;
    confidence: number | null;
    overallScore: number | null;
  };
};

export function PerformanceClient() {
  const { data, isLoading, isError } = useQuery<PerformanceData>({
    queryKey: ["performanceData"],
    queryFn: async () => {
      const res = await fetch("/api/performance");
      if (!res.ok) throw new Error("Failed to fetch performance data");
      return res.json();
    },
  });

  if (isLoading) {
    return <LoadingScreen message="Menganalisis performa kamu..." />;
  }

  if (isError || !data) {
    return (
      <div className="bg-red-50 text-red-600 p-4 border-2 border-red-500 rounded-md">
        Gagal memuat data performa. Silakan coba lagi.
      </div>
    );
  }

  const avgMetrics = [
    { label: "Komunikasi", val: Math.round(data.metrics.communication || 0), color: "bg-blue-500" },
    { label: "Teknikal", val: Math.round(data.metrics.technical || 0), color: "bg-primary-container" },
    { label: "Kepercayaan Diri", val: Math.round(data.metrics.confidence || 0), color: "bg-green-500" },
    { label: "Skor Akhir", val: Math.round(data.metrics.overallScore || 0), color: "bg-accent-red" },
  ];

  return (
    <>
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart 1 — Score Progress */}
        <div className="bg-white border-4 border-black p-8 shadow-brutal flex flex-col gap-6">
          <h3 className="text-style-h3 uppercase border-b-4 border-black pb-2">Progress Skor</h3>
          {data.interviews.length === 0 ? (
             <div className="h-64 flex items-center justify-center">
               <p className="text-xs font-bold uppercase opacity-40 text-center">Data belum tersedia.<br/>Lakukan minimal 1 sesi.</p>
             </div>
          ) : (
            <div className="h-64 flex items-end gap-3 px-4">
              {data.interviews.map((item, i) => (
                <div key={item.id} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-primary-container border-2 border-black shadow-brutal-sm transition-all hover:bg-yellow-400" 
                    style={{ height: `${item.overallScore}%` }}
                  />
                  <span className="text-[8px] font-bold uppercase">Sesi {i+1}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chart 2 — Skill Distribution */}
        <div className="bg-white border-4 border-black p-8 shadow-brutal flex flex-col gap-6">
          <h3 className="text-style-h3 uppercase border-b-4 border-black pb-2">Rata-Rata Skill</h3>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {avgMetrics.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex justify-between text-xs font-black uppercase">
                  <span>{s.label}</span>
                  <span>{s.val}%</span>
                </div>
                <div className="h-4 bg-surface border-2 border-black">
                  <div className="h-full border-r-2 border-black transition-all" style={{ width: `${s.val}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-tertiary-container border-4 border-black p-8 shadow-brutal mt-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Wawasan Nara</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-black p-4 shadow-brutal-sm">
            <h4 className="font-bold uppercase text-sm mb-2 text-blue-600 italic">Statistik Sesi</h4>
            <p className="text-sm font-medium">Kamu telah menyelesaikan total {data.interviews.length} sesi. Skor tertinggi kamu sejauh ini adalah {data.interviews.length > 0 ? Math.max(...data.interviews.map(i => i.overallScore)) : 0}.</p>
          </div>
          <div className="bg-white border-2 border-black p-4 shadow-brutal-sm">
            <h4 className="font-bold uppercase text-sm mb-2 text-green-600 italic">Catatan</h4>
            <p className="text-sm font-medium">Terus berlatih untuk menstabilkan rata-rata skor di atas 85%. Fokus pada konsistensi jawaban teknis.</p>
          </div>
        </div>
      </div>
    </>
  );
}
