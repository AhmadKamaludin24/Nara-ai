export function HowItWorks() {
  const steps = [
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
  ];

  return (
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

        <div className="grid md:grid-cols-3 gap-12 md:gap-0 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16.6%] right-[16.6%] h-1 bg-black z-0" />

          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center text-center px-4 md:px-6 relative z-10"
            >
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
  );
}
