"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { NaraLogo } from "@/components/ui/NaraLogo";
import { Dialog, type DialogVariant } from "@/components/ui/Dialog";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerificationPending, setIsVerificationPending] = useState(false);
  const router = useRouter();

  // Dialog State
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    desc: string;
    variant: DialogVariant;
  }>({ open: false, title: "", desc: "", variant: "info" });

  const showDialog = (title: string, desc: string, variant: DialogVariant) => {
    setDialog({ open: true, title, desc, variant });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await authClient.signIn.email({ email, password });
        if (error) {
          // Tangani khusus jika email belum diverifikasi
          if (error.code === "EMAIL_NOT_VERIFIED" || error.message?.toLowerCase().includes("verif")) {
            showDialog(
              "Email Belum Diverifikasi",
              `Kami telah mengirimkan link verifikasi ke ${email}. Harap cek kotak masuk atau folder spam kamu untuk mengaktifkan akun.`,
              "warning"
            );
            return;
          }
          throw new Error(error.message);
        }
        router.push("/dashboard");
      } else {
        if (!name) throw new Error("Nama harus diisi");
        const { data, error } = await authClient.signUp.email({ email, password, name });
        if (error) throw new Error(error.message);

        // Pendaftaran sukses -> Tampilkan Verification Pending UI
        setIsVerificationPending(true);
      }
    } catch (err: any) {
      showDialog("Terjadi Kesalahan", err.message || "Gagal melakukan aksi.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-surface selection:bg-primary-container overflow-hidden">

      {/* ===== LEFT PANEL — BRANDING ===== */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col relative overflow-hidden border-r-4 border-black">

        {/* Background grid decoration */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,214,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative badge */}
        <div className="absolute top-8 right-8 bg-[#FFD600] text-black border-4 border-[#FFD600] px-4 py-2 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,214,0,0.4)] rotate-2">
          AI-Powered
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <div>
            <div className="inline-flex items-center gap-3">
              <NaraLogo size={52} />
              <span className="font-black text-xl uppercase tracking-tighter text-white">NARA.AI</span>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">
              Latih<br />
              <span className="text-[#FFD600]">Interview</span><br />
              Kamu.
            </h1>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-2xl">
              Platform simulasi interview AI real-time. Jawab pertanyaan, dapatkan evaluasi mendalam, dan tingkatkan performamu.
            </p>

            {/* Feature list */}
            <div className="space-y-3 pt-4">
              {[
                { icon: "mic", text: "Interview suara real-time dengan AI" },
                { icon: "analytics", text: "Evaluasi performa mendalam & instan" },
                { icon: "trending_up", text: "Lacak perkembangan dari waktu ke waktu" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFD600] text-black border-2 border-[#FFD600] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                  </div>
                  <span className="text-zinc-300 text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="border-l-4 border-[#FFD600] pl-4">
            <p className="text-zinc-400 text-sm italic font-medium">
              &quot;Praktik membuat sempurna. Nara siap melatihmu kapanpun.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL — FORM ===== */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12 relative">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <span className="font-black text-3xl uppercase tracking-tighter italic">NARA.AI</span>
        </div>

        <div className="w-full max-w-2xl">

          {isVerificationPending ? (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-[#FFD600] border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-[40px]">mail</span>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Cek Email Kamu!</h2>
              <p className="text-zinc-600 font-medium leading-relaxed mb-8">
                Kami telah mengirimkan link verifikasi ke <strong className="text-black">{email}</strong>. 
                Silakan cek kotak masuk atau folder spam kamu, lalu klik link tersebut untuk mulai menggunakan Nara.
              </p>
              <button
                onClick={() => {
                  setIsVerificationPending(false);
                  setIsLogin(true);
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-4 border-4 border-black hover:bg-zinc-800 transition-colors shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,214,0,1)] active:shadow-none active:translate-y-[4px] active:translate-x-[4px]"
              >
                Kembali ke Login
              </button>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div className="flex border-4 border-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => { setIsLogin(true); }}
                  className={`flex-1 py-3 font-black uppercase text-sm tracking-wider transition-colors ${isLogin ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                  Masuk
                </button>
                <button
                  onClick={() => { setIsLogin(false); }}
                  className={`flex-1 py-3 font-black uppercase text-sm tracking-wider transition-colors ${!isLogin ? "bg-black text-white" : "bg-white text-black hover:bg-zinc-100"
                    }`}
                >
                  Daftar
                </button>
              </div>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter leading-tight">
                  {isLogin ? "Selamat Datang," : "Buat Akun,"}
                </h2>
                <p className="text-on-surface-variant font-medium mt-2">
                  {isLogin
                    ? "Masuk untuk melanjutkan sesi latihanmu."
                    : "Daftar gratis dan mulai latihan sekarang."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {!isLogin && (
                  <div className="flex flex-col gap-2">
                    <label className="font-black uppercase text-xs tracking-widest text-zinc-600">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Ahmad Kamaludin"
                      className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/30 transition-colors placeholder:text-zinc-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-xs tracking-widest text-zinc-600">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/30 transition-colors placeholder:text-zinc-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-black uppercase text-xs tracking-widest text-zinc-600">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/30 transition-colors placeholder:text-zinc-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FFD600] text-black font-black uppercase tracking-tighter text-lg py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[22px]">
                        {isLogin ? "login" : "person_add"}
                      </span>
                      {isLogin ? "Masuk Sekarang" : "Buat Akun"}
                    </>
                  )}
                </button>
              </form>

              {/* Footer link */}
              <p className="mt-8 text-center font-medium text-sm text-zinc-500">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button
                  onClick={() => { setIsLogin(!isLogin); }}
                  className="font-black text-black uppercase underline underline-offset-2 hover:text-blue-600 transition-colors tracking-tight"
                >
                  {isLogin ? "Daftar Gratis" : "Masuk Di Sini"}
                </button>
              </p>
            </>
          )}

          {/* Back to home */}
          <div className="mt-6 text-center space-y-4">
            <a
              href="/"
              className="block text-xs text-zinc-400 hover:text-black transition-colors font-medium uppercase tracking-wider"
            >
              ← Kembali ke Beranda
            </a>
            <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest border-t-2 border-zinc-100 pt-4 max-w-[200px] mx-auto">
              A Project by{" "}
              <a 
                href="https://github.com/AhmadKamaludin24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-black text-black hover:underline"
              >
                Ahmad Kamaludin
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Dialog Component */}
      <Dialog
        open={dialog.open}
        onClose={() => setDialog({ ...dialog, open: false })}
        title={dialog.title}
        description={dialog.desc}
        variant={dialog.variant}
      />
    </div>
  );
}
