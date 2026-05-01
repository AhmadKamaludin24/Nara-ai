import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect("/login");
  }

  const interviews = await prisma.interview.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const totalInterviews = await prisma.interview.count({
    where: { userId: session.user.id }
  });

  const avgScoreResult = await prisma.interview.aggregate({
    where: { userId: session.user.id },
    _avg: {
      overallScore: true
    }
  });

  const avgScore = Math.round(avgScoreResult._avg.overallScore || 0);

  return (
    <div className="p-gutter md:p-lg">
      <div className="max-w-[1200px] mx-auto space-y-xl">
        {/* Page Header */}
        <div className="flex justify-between items-end border-b-4 border-black pb-4">
          <div>
            <h1 className="text-style-h1 text-text-main uppercase">
              Overview
            </h1>
            <p className="text-style-body-lg text-on-surface-variant mt-2">
              Selamat datang kembali, <span className="font-bold">{session.user.name}</span>. Pantau metrik performa kamu.
            </p>
          </div>
          <Link href="/interview" className="hidden md:flex bg-[#FFD600] text-black border-[3px] border-black shadow-brutal text-style-h3 uppercase px-8 py-3 press-effect transition-all items-center gap-2">
            <span className="material-symbols-outlined">play_arrow</span>
            Mulai Sesi Baru
          </Link>
        </div>

        {/* Stats Grid */}
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

          {/* Card 3 — Practice Hours (Mock for now) */}
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
              <p className="text-style-h1 text-text-main">{interviews.length > 0 ? (interviews.length * 0.5).toFixed(1) : 0}</p>
            </div>
          </div>
        </div>

        {/* Recent Interviews Table */}
        <div className="bg-white border-4 border-black shadow-brutal">
          <div className="p-6 border-b-4 border-black flex justify-between items-center bg-surface-variant">
            <h2 className="text-style-h2 text-text-main uppercase">
              Interview Terakhir
            </h2>
            <Link href="/dashboard/history" className="text-style-label-bold uppercase border-b-2 border-black hover:text-secondary transition-colors">
              Lihat Semua
            </Link>
          </div>
          <div className="overflow-x-auto">
            {interviews.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-on-surface-variant font-medium">Belum ada riwayat interview. Mulai sesi pertamamu sekarang!</p>
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
                    <tr key={interview.id} className="border-b-2 border-black hover:bg-surface-variant transition-colors">
                      <td className="p-4 font-bold">{interview.role}</td>
                      <td className="p-4">{new Date(interview.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 uppercase text-xs font-black">{interview.level}</td>
                      <td className="p-4">
                        <span className="inline-block bg-primary-container border-2 border-black px-3 py-1 text-style-label-bold">
                          {interview.overallScore}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/feedback?id=${interview.id}`} className="bg-[#0057FF] text-white border-2 border-black shadow-brutal-sm px-4 py-2 text-style-label-bold uppercase inline-block press-effect">
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
      </div>
    </div>
  );
}
