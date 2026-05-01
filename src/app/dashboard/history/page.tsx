import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HistoryPage() {
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
  });

  return (
    <div className="p-gutter md:p-lg">
      <div className="max-w-[1200px] mx-auto space-y-xl">
        {/* Page Header */}
        <div className="flex justify-between items-end border-b-4 border-black pb-4">
          <div>
            <h1 className="text-style-h1 text-text-main uppercase">
              Riwayat Interview
            </h1>
            <p className="text-style-body-lg text-on-surface-variant mt-2">
              Daftar seluruh sesi latihan yang pernah kamu lakukan.
            </p>
          </div>
        </div>

        {/* Search & Filter (Static for now) */}
        <div className="flex flex-wrap gap-4 mb-8">
          <input 
            type="text" 
            placeholder="Cari role..." 
            className="bg-white border-4 border-black px-4 py-2 font-bold uppercase text-sm focus:bg-primary-container outline-none transition-colors w-full md:w-64 shadow-brutal-sm"
          />
          <select className="bg-white border-4 border-black px-4 py-2 font-bold uppercase text-sm outline-none shadow-brutal-sm cursor-pointer">
            <option>Semua Status</option>
            <option>Selesai</option>
            <option>Terhenti</option>
          </select>
        </div>

        {/* History Table */}
        <div className="bg-white border-4 border-black shadow-brutal">
          <div className="overflow-x-auto">
            {interviews.length === 0 ? (
               <div className="p-12 text-center">
                 <p className="text-on-surface-variant font-medium">Belum ada riwayat interview.</p>
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
                  {interviews.map((item) => (
                    <tr key={item.id} className="border-b-2 border-black hover:bg-surface-variant transition-colors">
                      <td className="p-4 font-bold">{item.role}</td>
                      <td className="p-4">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                      <td className="p-4 uppercase text-xs font-black">{item.level}</td>
                      <td className="p-4">
                        <span className={`inline-block border-2 border-black px-3 py-1 text-style-label-bold ${item.overallScore >= 85 ? 'bg-primary-container' : 'bg-white'}`}>
                          {item.overallScore}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/feedback?id=${item.id}`} className="bg-black text-white border-2 border-black shadow-brutal-sm px-4 py-2 text-style-label-bold uppercase hover:bg-blue-600 transition-colors inline-block">
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
