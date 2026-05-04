"use client";

import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import InterviewClient from "./_components/InterviewClient";
import { useEffect } from "react";

export default function InterviewPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userQuota"],
    queryFn: async () => {
      const res = await fetch("/api/user/quota");
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        throw new Error("Gagal mengambil data kuota");
      }
      return res.json();
    },
    staleTime: 0,
  });

  useEffect(() => {
    if (data && data.trialSeconds <= 0) {
      window.location.href = "/dashboard?error=quota_exceeded";
    }
  }, [data]);

  if (isLoading) {
    return <LoadingScreen fullScreen message="Memeriksa Kuota Interview" cycling />;
  }

  if (isError || !data) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-surface p-6">
        <div className="bg-white border-4 border-black p-8 shadow-brutal text-center">
          <h2 className="text-2xl font-black uppercase mb-4 text-red-500">Gagal Memuat</h2>
          <p className="text-zinc-600 mb-6">Terjadi kesalahan saat mengecek kuota interview kamu.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white font-black uppercase border-4 border-black shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return <InterviewClient initialTrialSeconds={data.trialSeconds ?? 0} />;
}
