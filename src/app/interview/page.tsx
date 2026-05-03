import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import InterviewClient from "./_components/InterviewClient";

export default async function InterviewPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { trialSeconds: true },
  });

  const trialSeconds = user?.trialSeconds ?? 0;

  return <InterviewClient initialTrialSeconds={trialSeconds} />;
}
