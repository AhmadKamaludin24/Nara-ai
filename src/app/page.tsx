import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeedbackPreview } from "@/components/landing/FeedbackPreview";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "NARA.AI — Simulasi Interview Kerja dengan AI Voice",
  description:
    "Latih kemampuan interview kamu dengan Nara, AI interviewer berbasis voice real-time. Dapatkan feedback objektif & tingkatkan performa interview.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface selection:bg-primary-container selection:text-text-main overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FeedbackPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
