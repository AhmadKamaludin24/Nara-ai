import { DashboardClient } from "./_components/DashboardClient";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function DashboardPage() {
  return (
    <div className="p-gutter md:p-lg">
      <div className="max-w-[1200px] mx-auto">
        <Suspense fallback={<LoadingScreen message="Memuat dashboard..." />}>
          <DashboardClient />
        </Suspense>
      </div>
    </div>
  );
}
