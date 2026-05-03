"use client";

import { useQuery } from "@tanstack/react-query";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import Link from "next/link";
import { useState } from "react";

// Assuming Interview type matches Prisma schema.
type Interview = {
  id: string;
  role: string;
  level: string;
  overallScore: number;
  createdAt: string;
};

export function HistoryClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: interviews, isLoading, isError } = useQuery<Interview[]>({
    queryKey: ["interviewsData"],
    queryFn: async () => {
      const res = await fetch("/api/interviews");
      if (!res.ok) throw new Error("Failed to fetch interviews data");
      return res.json();
    },
  });

  if (isLoading) {
    return <LoadingScreen message="Memuat riwayat interview..." />;
  }

  if (isError || !interviews) {
    return (
      <div className="bg-red-50 text-red-600 p-4 border-2 border-red-500 rounded-md">
        Gagal memuat data riwayat. Silakan coba lagi.
      </div>
    );
  }

  const filteredInterviews = interviews.filter((item) =>
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Cari role..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {filteredInterviews.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-on-surface-variant font-medium">Belum ada riwayat interview yang cocok.</p>
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
                {filteredInterviews.map((item) => (
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
    </>
  );
}
