import Link from "next/link";

interface FeedbackHeaderProps {
  candidateName: string;
  roleName: string;
}

export function FeedbackHeader({
  candidateName,
  roleName,
}: FeedbackHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-6 gap-6 md:gap-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            EVALUATION REPORT
          </span>
          <span className="text-style-label-bold uppercase opacity-60">
            NARA.AI
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">
          Hasil Interview
        </h1>
        <p className="text-base md:text-lg font-medium">
          Kandidat: <span className="font-bold">{candidateName}</span> —{" "}
          {roleName}
        </p>
      </div>
      <Link
        href="/dashboard"
        className="w-full md:w-auto text-center border-4 border-black bg-white px-6 py-3 font-bold uppercase text-sm shadow-brutal hover:-translate-y-1 hover:bg-primary-container transition-all"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
