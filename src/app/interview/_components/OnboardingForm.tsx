"use client";

import { useState } from "react";
import type { InterviewConfig } from "@/lib/vapi";
import { NaraLogo } from "@/components/ui/NaraLogo";

// ── Role Presets ──────────────────────────────────────────────────────────────

const PRESET_ROLES = {
  "Frontend Developer": {
    emoji: "💻",
    roleDescription: "Mengembangkan antarmuka interaktif dengan React.js dan memastikan performa website yang optimal.",
    keySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    questions: [
      "Ceritakan pengalaman paling berkesan saat Anda membuat aplikasi dengan React.",
      "Bagaimana cara Anda menangani state management pada aplikasi dengan skala besar?",
      "Ceritakan cara Anda mengoptimalkan performa rendering di Next.js atau React.",
    ],
  },
  "Backend Developer": {
    emoji: "⚙️",
    roleDescription: "Membangun sistem backend yang scalable, mengelola database, dan merancang API RESTful/GraphQL.",
    keySkills: ["Node.js", "Express", "PostgreSQL", "System Design"],
    questions: [
      "Bagaimana Anda merancang arsitektur database untuk aplikasi e-commerce?",
      "Ceritakan cara Anda menangani security dan authentikasi pada API.",
      "Pernahkah Anda mengalami isu bottleneck performa pada backend? Bagaimana solusinya?",
    ],
  },
  "UI/UX Designer": {
    emoji: "🎨",
    roleDescription: "Merancang pengalaman pengguna yang intuitif dan antarmuka yang menarik dengan Figma.",
    keySkills: ["Figma", "User Research", "Prototyping", "Wireframing"],
    questions: [
      "Bagaimana proses Anda saat memulai desain fitur baru dari nol?",
      "Bagaimana cara Anda memvalidasi desain Anda dengan user?",
      "Ceritakan pengalaman Anda menangani feedback dari developer atau stakeholder yang kurang setuju dengan desain Anda.",
    ],
  },
  "Product Manager": {
    emoji: "📊",
    roleDescription: "Mendefinisikan visi produk, mengelola roadmap, dan menjembatani antara bisnis dan engineering.",
    keySkills: ["Product Strategy", "Data Analysis", "Stakeholder Mgmt", "Agile"],
    questions: [
      "Bagaimana cara Anda menentukan prioritas fitur ketika ada banyak permintaan dari stakeholder?",
      "Ceritakan bagaimana Anda mengambil keputusan berdasarkan data.",
      "Bagaimana cara Anda mengelola tim yang memiliki perbedaan pendapat tentang arah produk?",
    ],
  },
  "Data Analyst": {
    emoji: "📈",
    roleDescription: "Menganalisis data untuk menghasilkan insight bisnis yang actionable.",
    keySkills: ["Python", "SQL", "Tableau", "Statistics"],
    questions: [
      "Ceritakan project analisis data paling kompleks yang pernah Anda kerjakan.",
      "Bagaimana cara Anda mengkomunikasikan temuan data ke audiens non-teknis?",
      "Bagaimana Anda menangani data yang kotor atau tidak lengkap?",
    ],
  },
};

const LEVELS = [
  { value: "junior", label: "Junior", desc: "0–2 tahun pengalaman", color: "bg-green-100 border-green-400" },
  { value: "mid", label: "Mid-Level", desc: "2–5 tahun pengalaman", color: "bg-yellow-100 border-yellow-400" },
  { value: "senior", label: "Senior", desc: "5+ tahun pengalaman", color: "bg-red-100 border-red-400" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function OnboardingForm({ onSubmit }: { onSubmit: (config: InterviewConfig) => void }) {
  const [step, setStep] = useState(1);
  const [candidateName, setName] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [customRole, setCustomRole] = useState("");
  const [level, setLevel] = useState<"junior" | "mid" | "senior">("mid");
  const [customDescription, setCustomDescription] = useState("");
  const [customSkills, setCustomSkills] = useState("");
  const [customQuestions, setCustomQuestions] = useState("");

  const TOTAL_STEPS = 3;

  const handleFinalSubmit = () => {
    if (role === "Custom") {
      if (!customRole || !customDescription || !customSkills || !customQuestions) return;
      onSubmit({
        candidateName,
        role: customRole,
        level,
        roleDescription: customDescription,
        keySkills: customSkills.split(",").map((s) => s.trim()).filter(Boolean),
        questions: customQuestions.split("\n").map((q) => q.trim()).filter(Boolean),
      });
    } else {
      const preset = PRESET_ROLES[role as keyof typeof PRESET_ROLES];
      onSubmit({
        candidateName,
        role,
        level,
        roleDescription: preset.roleDescription,
        keySkills: preset.keySkills,
        questions: preset.questions,
      });
    }
  };

  const selectedPreset = role !== "Custom" ? PRESET_ROLES[role as keyof typeof PRESET_ROLES] : null;

  return (
    <div className="min-h-screen w-full flex flex-col selection:bg-primary-container">
      {/* ── Navbar ── */}
      <header className="flex items-center justify-between px-8 py-4 border-b-4 border-black bg-white shrink-0">
        <div className="flex items-center gap-3">
          <NaraLogo size={36} />
          <span className="font-black text-lg uppercase tracking-tighter">NARA.AI</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Session Ready
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ── Left: branding panel ── */}
        <div className="hidden lg:flex lg:w-2/5 bg-black text-white flex-col justify-between p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,214,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.8) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="relative z-10 space-y-8">
            <div>
              <div className="inline-block bg-[#FFD600] text-black font-black text-xs uppercase tracking-widest px-3 py-1 border-2 border-[#FFD600] mb-4">
                LANGKAH {step} / {TOTAL_STEPS}
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
                Siap Untuk<br />
                <span className="text-[#FFD600]">Interview?</span>
              </h1>
              <p className="text-zinc-400 mt-4 font-medium leading-relaxed">
                Isi detail di bawah ini agar Nara dapat menyiapkan sesi interview yang tepat untukmu.
              </p>
            </div>

            {/* Progress steps */}
            <div className="space-y-3">
              {[
                { n: 1, label: "Identitas Kandidat" },
                { n: 2, label: "Posisi & Level" },
                { n: 3, label: "Konfirmasi & Mulai" },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`flex items-center gap-3 transition-all ${step >= s.n ? "opacity-100" : "opacity-30"}`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center border-2 font-black text-sm shrink-0 ${step > s.n
                      ? "bg-[#FFD600] border-[#FFD600] text-black"
                      : step === s.n
                        ? "bg-white border-white text-black"
                        : "bg-transparent border-zinc-600 text-zinc-600"
                      }`}
                  >
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className={`font-bold uppercase text-sm tracking-wide ${step === s.n ? "text-white" : "text-zinc-500"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 border-l-4 border-[#FFD600] pl-4">
            <p className="text-zinc-400 text-sm italic">
              &quot;Interview yang baik dimulai dari persiapan yang matang.&quot;
            </p>
          </div>
        </div>

        {/* ── Right: form panel ── */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 bg-surface">
          {/* Mobile step indicator */}
          <div className="lg:hidden w-full max-w-2xl mb-6 flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 border-2 border-black transition-all ${step >= s ? "bg-black" : "bg-white"}`}
              />
            ))}
          </div>

          <div className="w-full max-w-2xl">
            {/* ── STEP 1: Identitas ── */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Halo, Siapa Kamu?</h2>
                  <p className="text-on-surface-variant font-medium mt-1">
                    Nara perlu tahu nama kamu agar bisa memanggilmu selama sesi berlangsung.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-xs tracking-widest text-zinc-600">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Ahmad Kamaludin"
                    autoFocus
                    className="w-full bg-white border-4 border-black px-4 py-4 font-medium text-lg outline-none focus:bg-primary-container/20 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:text-zinc-400"
                  />
                </div>

                {/* Tips */}
                <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <p className="font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                    Tips Sebelum Mulai
                  </p>
                  <ul className="text-sm text-zinc-600 space-y-1 font-medium">
                    <li>✓ Pastikan mikrofon kamu berfungsi dengan baik</li>
                    <li>✓ Cari tempat yang tenang dan minim gangguan</li>
                    <li>✓ Interview akan berlangsung ±10 menit</li>
                  </ul>
                </div>

                <button
                  disabled={!candidateName.trim()}
                  onClick={() => setStep(2)}
                  className="w-full bg-black text-white font-black uppercase tracking-tight text-lg py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Lanjutkan
                  <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                </button>
              </div>
            )}

            {/* ── STEP 2: Role & Level ── */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Pilih Posisi</h2>
                  <p className="text-on-surface-variant font-medium mt-1">
                    Pilih role yang ingin kamu latih, atau buat custom sendiri.
                  </p>
                </div>

                {/* Role cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(PRESET_ROLES).map(([r, data]) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-3 border-4 text-left transition-all ${role === r
                        ? "border-black bg-[#FFD600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                        : "border-black bg-white hover:bg-surface shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                        }`}
                    >
                      <div className="text-xl mb-1">{data.emoji}</div>
                      <div className="font-black text-xs uppercase tracking-tight leading-tight">{r}</div>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setRole("Custom")}
                    className={`p-3 border-4 text-left transition-all ${role === "Custom"
                      ? "border-black bg-[#FFD600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                      : "border-dashed border-black bg-white hover:bg-surface"
                      }`}
                  >
                    <div className="text-xl mb-1">✏️</div>
                    <div className="font-black text-xs uppercase tracking-tight leading-tight">Custom Role</div>
                  </button>
                </div>

                {/* Custom fields */}
                {role === "Custom" && (
                  <div className="space-y-4 p-4 border-4 border-dashed border-black bg-white">
                    <h3 className="font-black uppercase text-sm tracking-widest">Konfigurasi Custom</h3>
                    <input type="text" value={customRole} onChange={(e) => setCustomRole(e.target.value)} placeholder="Nama posisi (cth: Data Analyst)" className="w-full border-4 border-black px-3 py-2 font-medium outline-none focus:bg-primary-container/20 text-sm" />
                    <textarea value={customDescription} onChange={(e) => setCustomDescription(e.target.value)} placeholder="Deskripsi peran..." className="w-full border-4 border-black px-3 py-2 font-medium outline-none resize-none min-h-[70px] text-sm" />
                    <input type="text" value={customSkills} onChange={(e) => setCustomSkills(e.target.value)} placeholder="Key skills (pisahkan dengan koma)" className="w-full border-4 border-black px-3 py-2 font-medium outline-none focus:bg-primary-container/20 text-sm" />
                    <textarea value={customQuestions} onChange={(e) => setCustomQuestions(e.target.value)} placeholder={"Pertanyaan (satu baris = satu pertanyaan)\nCth: Ceritakan pengalamanmu..."} className="w-full border-4 border-black px-3 py-2 font-medium outline-none resize-none min-h-[100px] text-sm" />
                  </div>
                )}

                {/* Level selector */}
                <div className="space-y-2">
                  <label className="font-black uppercase text-xs tracking-widest text-zinc-600">Level Pengalaman</label>
                  <div className="grid grid-cols-3 gap-3">
                    {LEVELS.map((l) => (
                      <button
                        key={l.value}
                        type="button"
                        onClick={() => setLevel(l.value as any)}
                        className={`p-3 border-4 transition-all text-left ${level === l.value
                          ? "border-black bg-[#FFD600] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
                          : "border-black bg-white hover:bg-surface"
                          }`}
                      >
                        <div className="font-black text-sm uppercase">{l.label}</div>
                        <div className="text-xs text-zinc-500 font-medium">{l.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 bg-white text-black font-black uppercase text-sm py-3 border-4 border-black hover:bg-surface transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Kembali
                  </button>
                  <button onClick={() => setStep(3)} className="flex-[2] bg-black text-white font-black uppercase text-sm py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-2">
                    Lanjutkan
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Launch Pad ── */}
            {step === 3 && (
              <div className="space-y-5">

                {/* ── Big Identity Hero Card ── */}
                <div className="relative bg-black text-white border-4 border-black overflow-hidden">
                  {/* Animated grid bg */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,214,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.8) 1px, transparent 1px)",
                      backgroundSize: "28px 28px"
                    }}
                  />
                  {/* Top accent bar */}
                  <div className="relative bg-[#FFD600] text-black px-6 py-2 flex items-center justify-between border-b-4 border-black">
                    <span className="font-black uppercase text-xs tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                      Session Ready
                    </span>
                    <span className="font-mono text-xs font-bold">ID: NRA-{Math.random().toString(36).slice(2,7).toUpperCase()}</span>
                  </div>
                  {/* Main content */}
                  <div className="relative p-6 flex flex-col gap-4">
                    <div>
                      <p className="text-zinc-400 font-black uppercase text-xs tracking-widest mb-1">Kandidat</p>
                      <p className="text-3xl font-black tracking-tight leading-none">{candidateName}</p>
                    </div>
                    <div className="h-px bg-zinc-800" />
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-zinc-400 font-black uppercase text-xs tracking-widest mb-1">Posisi</p>
                        <p className="text-xl font-black">{role === "Custom" ? customRole : role}</p>
                      </div>
                      <div className={`px-4 py-2 border-4 border-white font-black text-sm uppercase ${level === "junior" ? "bg-green-400 text-black" : level === "mid" ? "bg-[#FFD600] text-black" : "bg-red-500 text-white"}`}>
                        {level}
                      </div>
                    </div>
                    {selectedPreset && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {selectedPreset.keySkills.map((s) => (
                          <span key={s} className="bg-zinc-800 text-zinc-300 text-xs font-bold uppercase px-2 py-1 border border-zinc-700">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Checklist ── */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[
                    { icon: "mic", label: "Mikrofon", sub: "Siap?" },
                    { icon: "volume_up", label: "Speaker", sub: "Aktif?" },
                    { icon: "wifi", label: "Koneksi", sub: "Stabil?" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white border-4 border-black p-2 md:p-3 flex flex-col items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
                      <span className="material-symbols-outlined text-[24px] md:text-[28px]">{item.icon}</span>
                      <span className="font-black text-[10px] md:text-xs uppercase tracking-tight text-center">{item.label}</span>
                      <span className="text-zinc-400 text-[8px] md:text-[10px] font-medium uppercase">{item.sub}</span>
                    </div>
                  ))}
                </div>

                {/* ── Mic warning ── */}
                <div className="bg-[#FFD600] border-4 border-black p-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[22px] shrink-0">info</span>
                  <p className="text-xs md:text-sm font-bold">Browser akan meminta izin mikrofon. Klik <u>Allow</u> untuk melanjutkan.</p>
                </div>

                {/* ── CTA Buttons ── */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 bg-white text-black font-black uppercase text-sm py-3 border-4 border-black hover:bg-surface transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Kembali
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="flex-1 relative bg-[#FFD600] text-black font-black uppercase tracking-tighter text-lg py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all flex items-center justify-center gap-3 group overflow-hidden"
                  >
                    {/* Shimmer sweep */}
                    <span className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                    <span className="material-symbols-outlined text-[24px] relative">play_circle</span>
                    <span className="relative">Mulai Interview!</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
