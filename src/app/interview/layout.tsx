import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sesi Interview",
  description:
    "Sesi interview real-time dengan Nara, AI interviewer. Latih kemampuan verbal dan komunikasi kamu.",
};

export default function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
