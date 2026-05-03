interface InsightCardProps {
  insight: string;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <div className="bg-primary-container border-4 border-black p-8 shadow-brutal mt-4 relative">
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-brutal rotate-[-10deg]">
        <span className="material-symbols-outlined font-black">lightbulb</span>
      </div>
      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 ml-6">
        AI Insight
      </h2>
      <p className="text-lg font-medium leading-relaxed">{insight}</p>
    </div>
  );
}
