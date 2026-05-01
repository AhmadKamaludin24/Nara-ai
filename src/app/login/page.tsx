"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });
        if (error) throw new Error(error.message);
        router.push("/dashboard");
      } else {
        if (!name) throw new Error("Nama harus diisi");
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (error) throw new Error(error.message);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-surface bg-dot-pattern selection:bg-primary-container p-4">
      <div className="w-full max-w-2xl bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <div className="flex flex-col items-center mb-8 border-b-4 border-black pb-6">
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">NARA.AI</h1>
          <p className="text-on-surface-variant font-bold uppercase mt-2">
            {isLogin ? "Sistem Login" : "Registrasi Akun Baru"}
          </p>
        </div>

        {error && (
          <div className="bg-accent-red text-white p-4 font-bold border-4 border-black mb-6 shadow-brutal">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-tight">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama..."
                className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/20 transition-colors"
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm tracking-tight">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email..."
              className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/20 transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm tracking-tight">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
              className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/20 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-black font-black uppercase tracking-tighter text-xl py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        <div className="mt-8 text-center border-t-4 border-black pt-6">
          <p className="font-bold">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 hover:underline uppercase tracking-tighter"
            >
              {isLogin ? "Daftar Sekarang" : "Masuk Di Sini"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
