import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-black border-b-4 border-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="bg-dot-pattern w-full h-full"
          style={{ filter: "invert(1)" }}
        />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 text-center relative z-10">
        <div className="inline-flex items-center bg-primary-container border-[3px] border-black px-4 py-1.5 shadow-brutal mb-8">
          <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse mr-2" />
          <span className="text-style-label-bold uppercase tracking-tight text-black">
            Mulai Sekarang
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
          className="inline-flex items-center gap-3 bg-primary-container text-black border-4 border-black shadow-brutal-lg text-lg md:text-style-h3 uppercase px-8 md:px-12 py-4 md:py-5 press-effect hover:-translate-y-2 transition-all"
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">play_arrow</span>
          <span className="hidden sm:inline">Coba 1 Menit Gratis</span>
          <span className="sm:hidden">Coba Gratis</span>
        </Link>
      </div>
    </section>
  );
}
