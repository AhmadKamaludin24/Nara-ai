import Link from "next/link";

interface Interview {
  id: string;
  role: string;
  createdAt: Date;
  level: string;
  overallScore: number;
}

interface RecentInterviewsTableProps {
  interviews: Interview[];
}

export function RecentInterviewsTable({
  interviews,
}: RecentInterviewsTableProps) {
  return (
    <div className="bg-white border-4 border-black shadow-brutal">
      <div className="p-6 border-b-4 border-black flex justify-between items-center bg-surface-variant">
        <h2 className="text-style-h2 text-text-main uppercase">
          Interview Terakhir
        </h2>
        <Link
          href="/dashboard/history"
          className="text-style-label-bold uppercase border-b-2 border-black hover:text-secondary transition-colors"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="overflow-x-auto">
        {interviews.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-on-surface-variant font-medium">
              Belum ada riwayat interview. Mulai sesi pertamamu sekarang!
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-black bg-surface">
                <th className="p-4 text-style-label-bold uppercase text-on-surface-variant">
                  Role / Topik
                </th>
                <th className="p-4 text-style-label-bold uppercase text-on-surface-variant">
                  Tanggal
                </th>
                <th className="p-4 text-style-label-bold uppercase text-on-surface-variant">
                  Level
                </th>
                <th className="p-4 text-style-label-bold uppercase text-on-surface-variant">
                  Skor
                </th>
                <th className="p-4 text-style-label-bold uppercase text-on-surface-variant text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="text-style-transcript font-medium">
              {interviews.map((interview) => (
                <tr
                  key={interview.id}
                  className="border-b-2 border-black hover:bg-surface-variant transition-colors"
                >
                  <td className="p-4 font-bold">{interview.role}</td>
                  <td className="p-4">
                    {new Date(interview.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="p-4 uppercase text-xs font-black">
                    {interview.level}
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-primary-container border-2 border-black px-3 py-1 text-style-label-bold">
                      {interview.overallScore}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/feedback?id=${interview.id}`}
                      className="bg-[#0057FF] text-white border-2 border-black shadow-brutal-sm px-4 py-2 text-style-label-bold uppercase inline-block press-effect"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
