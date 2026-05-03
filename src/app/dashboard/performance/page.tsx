import { PerformanceClient } from "./_components/PerformanceClient";

export default function PerformancePage() {
  return (
    <div className="p-gutter md:p-lg">
      <div className="max-w-[1200px] mx-auto space-y-xl">
        {/* Page Header */}
        <div className="flex justify-between items-end border-b-4 border-black pb-4">
          <div>
            <h1 className="text-style-h1 text-text-main uppercase">
              Performa Analitik
            </h1>
            <p className="text-style-body-lg text-on-surface-variant mt-2">
              Analisis mendalam mengenai perkembangan skill interview kamu.
            </p>
          </div>
        </div>

        <PerformanceClient />
      </div>
    </div>
  );
}
