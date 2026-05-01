import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NARA.AI — Simulasi Interview Kerja dengan AI Voice",
  description:
    "Latih kemampuan interview kamu dengan Nara, AI interviewer berbasis voice real-time. Dapatkan feedback objektif & tingkatkan performa interview.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface selection:bg-primary-container selection:text-text-main overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-background-main border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-container border-2 border-black rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px] text-black">
                mic
              </span>
            </div>
            <span className="text-xl font-black italic tracking-tighter text-black uppercase">
              NARA.AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#fitur"
              className="text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              className="text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#feedback"
              className="text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
            >
              Feedback
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden md:block text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
            >
              Login
            </Link>
            <Link
              href="/interview"
              className="bg-primary-container text-black border-[3px] border-black shadow-brutal text-style-label-bold uppercase px-6 py-2 press-effect hover:-translate-y-0.5 transition-all"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-background-main border-b-4 border-black overflow-hidden">
        {/* Dot pattern background */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left — Copy */}
            <div className="space-y-8 w-full">
              <div className="inline-flex items-center bg-primary-container border-[3px] border-black px-4 py-1.5 shadow-brutal rotate-[-1deg]">
                <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse mr-2" />
                <span className="text-style-label-bold uppercase tracking-tight text-black">
                  AI Voice Interview — Real-Time
                </span>
              </div>

              <h1 className="text-7xl md:text-style-h1 text-text-main uppercase leading-[1.05] font-black">
                Latihan
                <br />
                Interview
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10">Tanpa Batas</span>
                  <span className="absolute bottom-1 left-0 w-full h-4 bg-primary-container -z-0 -rotate-1" />
                </span>
              </h1>

              <p className="text-lg md:text-style-body-lg text-on-surface-variant max-w-2xk">
                Bicara langsung dengan <strong>Nara</strong>, AI interviewer
                yang memahami konteks dan memberikan feedback real-time.
                Tingkatkan skill interview kamu sebelum hari-H.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/interview"
                  className="bg-[#0057FF] text-white border-4 border-black shadow-brutal text-style-h3 uppercase px-10 py-4 press-effect hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl">
                    play_arrow
                  </span>
                  Mulai Interview
                </Link>
                <a
                  href="#cara-kerja"
                  className="bg-white text-text-main border-4 border-black shadow-brutal text-style-h3 uppercase px-10 py-4 press-effect hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl">
                    info
                  </span>
                  Pelajari
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[
                    "bg-blue-400",
                    "bg-yellow-400",
                    "bg-green-400",
                    "bg-pink-400",
                  ].map((color, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-black ${color} flex items-center justify-center`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-black">
                        person
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-style-label-bold text-text-main">
                    2,500+ pengguna aktif
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Rata-rata skor naik 23% setelah 5 sesi
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Visual */}
            <div className="relative flex items-center justify-center">
              {/* Large decorative circle */}
              <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] bg-white border-4 border-black rounded-full shadow-brutal-lg relative flex items-center justify-center overflow-hidden">
                {/* Static wave bars */}
                <div className="flex items-center justify-center gap-2 px-12 h-full">
                  {[40, 65, 50, 80, 55, 75, 45, 60, 70].map((h, i) => (
                    <div
                      key={i}
                      className="wave-bar w-3 md:w-4 bg-secondary-container border-2 border-black"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-2 md:right-4 bg-primary-container border-[3px] border-black px-4 py-2 shadow-brutal rotate-3 z-20">
                <p className="text-style-label-bold uppercase text-black">
                  Skor: 92/100
                </p>
              </div>

              <div className="absolute -bottom-4 -left-2 md:left-4 bg-white border-[3px] border-black px-4 py-2 shadow-brutal -rotate-2 z-20">
                <p className="text-style-label-bold uppercase text-black flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    trending_up
                  </span>
                  +23% improvement
                </p>
              </div>

              <div className="absolute top-1/2 -right-4 md:right-0 bg-secondary-container text-white border-[3px] border-black px-4 py-2 shadow-brutal rotate-1 z-20">
                <p className="text-style-label-bold uppercase flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">
                    mic
                  </span>
                  Real-Time Voice
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="fitur" className="bg-surface border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-black text-white px-4 py-1.5 border-2 border-black mb-6">
              <span className="text-style-label-bold uppercase tracking-widest">
                Fitur Utama
              </span>
            </div>
            <h2 className="text-style-h1 text-text-main uppercase">
              Kenapa Nara?
            </h2>
            <p className="text-style-body-lg text-on-surface-variant mt-4 max-w-2xl mx-auto">
              Bukan chatbot biasa — Nara adalah AI interviewer berbasis voice
              yang memahami konteks percakapan.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border-4 border-black p-8 shadow-brutal-blue hover:-translate-y-2 transition-transform group">
              <div className="w-16 h-16 bg-primary-container border-4 border-black shadow-brutal flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl text-black">
                  record_voice_over
                </span>
              </div>
              <h3 className="text-style-h3 text-text-main uppercase mb-3">
                Voice Real-Time
              </h3>
              <p className="text-style-body-md text-on-surface-variant">
                Percakapan dua arah secara langsung. Nara mendengar, memahami,
                dan merespon seperti interviewer sungguhan.
              </p>
              <div className="mt-6 pt-4 border-t-2 border-black">
                <span className="text-style-label-bold text-secondary uppercase flex items-center gap-1">
                  Latency &lt; 500ms
                  <span className="material-symbols-outlined text-[14px]">
                    bolt
                  </span>
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-primary-container border-4 border-black p-8 shadow-brutal-blue hover:-translate-y-2 transition-transform group">
              <div className="w-16 h-16 bg-white border-4 border-black shadow-brutal flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl text-black">
                  psychology
                </span>
              </div>
              <h3 className="text-style-h3 text-text-main uppercase mb-3">
                Context-Aware
              </h3>
              <p className="text-style-body-md text-on-surface-variant">
                Nara mengingat semua jawaban kamu. Follow-up question otomatis
                berdasarkan respon sebelumnya.
              </p>
              <div className="mt-6 pt-4 border-t-2 border-black">
                <span className="text-style-label-bold text-secondary uppercase flex items-center gap-1">
                  Adaptive Flow
                  <span className="material-symbols-outlined text-[14px]">
                    auto_awesome
                  </span>
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-4 border-black p-8 shadow-brutal-blue hover:-translate-y-2 transition-transform group">
              <div className="w-16 h-16 bg-tertiary-container border-4 border-black shadow-brutal flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl text-black">
                  analytics
                </span>
              </div>
              <h3 className="text-style-h3 text-text-main uppercase mb-3">
                Feedback AI
              </h3>
              <p className="text-style-body-md text-on-surface-variant">
                Setelah sesi selesai, dapatkan skor komunikasi, teknikal,
                kekuatan & kelemahan, dan saran spesifik.
              </p>
              <div className="mt-6 pt-4 border-t-2 border-black">
                <span className="text-style-label-bold text-secondary uppercase flex items-center gap-1">
                  Actionable Insights
                  <span className="material-symbols-outlined text-[14px]">
                    trending_up
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section
        id="cara-kerja"
        className="bg-background-main border-b-4 border-black"
      >
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-black text-white px-4 py-1.5 border-2 border-black mb-6">
              <span className="text-style-label-bold uppercase tracking-widest">
                Cara Kerja
              </span>
            </div>
            <h2 className="text-style-h1 text-text-main uppercase">
              3 Langkah Mudah
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-1 bg-black z-0" />

            {[
              {
                step: "01",
                icon: "tune",
                title: "Pilih Role & Level",
                desc: "Tentukan posisi yang ingin kamu latih — Frontend Developer, Product Manager, Data Analyst, dan lainnya.",
                color: "bg-primary-container",
              },
              {
                step: "02",
                icon: "campaign",
                title: "Interview dengan Nara",
                desc: "Bicara langsung dengan Nara. Dia akan bertanya, mendengar, dan merespon secara real-time lewat voice.",
                color: "bg-secondary-container text-white",
              },
              {
                step: "03",
                icon: "stars",
                title: "Terima Feedback",
                desc: "Dapatkan evaluasi lengkap — skor komunikasi, teknikal, kekuatan, kelemahan, dan saran perbaikan.",
                color: "bg-tertiary-container",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center px-6 relative z-10">
                {/* Step circle */}
                <div
                  className={`w-32 h-32 ${item.color} border-4 border-black rounded-full shadow-brutal-lg flex items-center justify-center mb-8`}
                >
                  <span className="material-symbols-outlined text-5xl">
                    {item.icon}
                  </span>
                </div>

                {/* Step number */}
                <div className="bg-black text-white border-2 border-black px-3 py-1 mb-4">
                  <span className="text-style-label-bold uppercase tracking-widest">
                    Langkah {item.step}
                  </span>
                </div>

                <h3 className="text-style-h3 text-text-main uppercase mb-3">
                  {item.title}
                </h3>
                <p className="text-style-body-md text-on-surface-variant max-w-2xl">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK PREVIEW ===== */}
      <section id="feedback" className="bg-surface border-b-4 border-black">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — Feedback card mockup */}
            <div className="space-y-6">
              <div className="bg-white border-4 border-black shadow-brutal-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-style-h2 text-text-main uppercase">
                    Feedback
                  </h3>
                  <div className="bg-primary-container border-2 border-black px-3 py-1">
                    <span className="text-style-label-bold uppercase">
                      Skor: 87
                    </span>
                  </div>
                </div>

                {/* Score bars */}
                <div className="space-y-5">
                  {[
                    { label: "Komunikasi", score: 90, color: "bg-[#0057FF]" },
                    {
                      label: "Teknikal",
                      score: 82,
                      color: "bg-primary-container",
                    },
                    {
                      label: "Kepercayaan Diri",
                      score: 88,
                      color: "bg-tertiary-container",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-style-label-bold uppercase text-text-main">
                          {item.label}
                        </span>
                        <span className="text-style-label-bold text-text-main">
                          {item.score}/100
                        </span>
                      </div>
                      <div className="h-6 bg-surface-variant border-2 border-black relative overflow-hidden">
                        <div
                          className={`h-full ${item.color} border-r-2 border-black`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t-4 border-black space-y-4">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-green-600 text-xl mt-0.5">
                      check_circle
                    </span>
                    <p className="text-style-body-md text-text-main">
                      <strong>Kekuatan:</strong> Jawaban terstruktur dengan
                      contoh konkret menggunakan metode STAR.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-accent-red text-xl mt-0.5">
                      flag
                    </span>
                    <p className="text-style-body-md text-text-main">
                      <strong>Perbaikan:</strong> Kurangi filler words dan
                      perkuat closing statement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center bg-black text-white px-4 py-1.5 border-2 border-black">
                <span className="text-style-label-bold uppercase tracking-widest">
                  Evaluasi AI
                </span>
              </div>
              <h2 className="text-style-h1 text-text-main uppercase">
                Feedback yang Actionable
              </h2>
              <p className="text-style-body-lg text-on-surface-variant max-w-2xl">
                Nara tidak hanya memberi skor — tapi juga menjelaskan{" "}
                <strong>kenapa</strong> dan <strong>bagaimana</strong> cara
                memperbaikinya. Setiap sesi menghasilkan evaluasi detail.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  "Communication score & technical score",
                  "Analisis kekuatan & kelemahan",
                  "Saran perbaikan spesifik per jawaban",
                  "Riwayat lengkap untuk tracking progress",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary-container border-2 border-black flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[14px] text-black">
                        check
                      </span>
                    </div>
                    <span className="text-style-body-md text-text-main">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-black border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="bg-dot-pattern w-full h-full" style={{ filter: "invert(1)" }} />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 text-center relative z-10">
          <div className="inline-flex items-center bg-primary-container border-[3px] border-black px-4 py-1.5 shadow-brutal mb-8">
            <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse mr-2" />
            <span className="text-style-label-bold uppercase tracking-tight text-black">
              Mulai Sekarang — Gratis
            </span>
          </div>

          <h2 className="text-[40px] md:text-style-h1 font-extrabold text-white uppercase leading-tight mb-6">
            Siap Menghadapi
            <br />
            Interview Berikutnya?
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Bergabung dengan 2,500+ profesional yang sudah meningkatkan skill
            interview mereka bersama Nara.
          </p>

          <Link
            href="/interview"
            className="inline-flex items-center gap-3 bg-primary-container text-black border-4 border-black shadow-brutal-lg text-style-h3 uppercase px-12 py-5 press-effect hover:-translate-y-2 transition-all"
          >
            <span className="material-symbols-outlined text-3xl">
              play_arrow
            </span>
            Mulai Interview Sekarang
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-background-main border-t-0">
        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-container border-2 border-black rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px] text-black">
                  mic
                </span>
              </div>
              <span className="text-xl font-black italic tracking-tighter text-black uppercase">
                NARA.AI
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <a href="#fitur" className="hover:text-text-main transition-colors">
                Fitur
              </a>
              <a href="#cara-kerja" className="hover:text-text-main transition-colors">
                Cara Kerja
              </a>
              <a href="#feedback" className="hover:text-text-main transition-colors">
                Feedback
              </a>
              <Link
                href="/dashboard"
                className="hover:text-text-main transition-colors"
              >
                Dashboard
              </Link>
            </div>

            <p className="text-xs text-on-surface-variant">
              © 2026 NaraAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
