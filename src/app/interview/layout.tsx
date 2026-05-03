import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sesi Interview",
  description:
    "Sesi interview real-time dengan Nara, AI interviewer. Latih kemampuan verbal dan komunikasi kamu.",
};

export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Cek kuota waktu trial user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { trialSeconds: true },
  });

  if (!user || user.trialSeconds <= 0) {
    redirect("/dashboard?error=quota_exceeded");
  }

  return <>{children}</>;
}
