export function FeedbackPreview() {
  const scores = [
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
  ];

  return (
    <section id="feedback" className="bg-surface border-b-4 border-black">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Feedback card mockup */}
          <div className="space-y-6">
            <div className="bg-white border-4 border-black shadow-brutal-lg p-6 md:p-8">
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
                {scores.map((item) => (
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
  );
}
