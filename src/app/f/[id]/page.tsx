import type { Metadata } from "next";
import PublicFeedbackClient from "./_components/PublicFeedbackClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/f/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { title: "Hasil Interview | NARA.AI" };

    const data = await res.json();
    return {
      title: `Hasil Interview ${data.role} — ${data.overallScore}/100 | NARA.AI`,
      description: `Lihat hasil evaluasi interview AI untuk posisi ${data.role} level ${data.level}. Skor keseluruhan: ${data.overallScore}/100.`,
      openGraph: {
        title: `Hasil Interview ${data.role} | NARA.AI`,
        description: `Skor: ${data.overallScore}/100 • Komunikasi: ${data.communication} • Teknikal: ${data.technical}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Hasil Interview | NARA.AI" };
  }
}

export default async function PublicFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PublicFeedbackClient id={id} />;
}
