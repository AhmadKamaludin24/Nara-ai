export function Features() {
  return (
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
  );
}
