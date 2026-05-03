"use client";

import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { DashboardHeader } from "./DashboardHeader";
import { StatsGrid } from "./StatsGrid";
import { RecentInterviewsTable } from "./RecentInterviewsTable";
import { Dialog } from "@/components/ui/Dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (searchParams.get("error") === "quota_exceeded") {
      setShowError(true);
    }
  }, [searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
  });

  const handleCloseError = () => {
    setShowError(false);
    router.replace("/dashboard");
  };

  if (isLoading) {
    return <LoadingScreen message="Memuat dashboard..." />;
  }

  if (isError || !data) {
    return (
      <div className="bg-red-50 text-red-600 p-4 border-2 border-red-500 rounded-md">
        Gagal memuat data dashboard. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 md:space-y-xl">
      <DashboardHeader userName={data.userName} />
      
      <StatsGrid 
        totalInterviews={data.stats.totalInterviews}
        avgScore={data.stats.avgScore}
        practiceHours={data.stats.practiceHours}
      />

      <RecentInterviewsTable interviews={data.interviews} />

      <Dialog
        open={showError}
        onClose={handleCloseError}
        title="Waktu Trial Habis"
        description="Maaf, batas waktu trial kamu (1 menit) sudah habis. Kenapa cuma 1 menit? Karena ini cuma project gabut gue aja, jadi harus hemat token AI ya 🙏."
        variant="warning"
        confirmLabel="Mengerti"
      />
    </div>
  );
}
