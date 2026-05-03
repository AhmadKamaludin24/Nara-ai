import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isModelActive = process.env.NEXT_PUBLIC_VAPI_STATUS !== "INACTIVE";

  return (
    <nav className="fixed w-full top-0 z-50 bg-background-main border-b-4 border-black">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container border-2 border-black rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-black">
              mic
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black italic tracking-tighter text-black uppercase hidden sm:block">
              NARA.AI
            </span>
            {isModelActive ? (
              <div className="flex items-center gap-1.5 bg-[#4ade80] text-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Model Aktif</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Model Nonaktif</span>
              </div>
            )}
          </div>
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
          <a
            href="https://github.com/AhmadKamaludin24/Nara-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">star</span>
            Star us
          </a>
          <Link
            href={session ? "/dashboard" : "/login"}
            className="hidden md:block text-style-label-bold uppercase text-text-main hover:text-secondary transition-colors"
          >
            {session ? "Dashboard" : "Login"}
          </Link>
          <Link
            href="/interview"
            className="bg-primary-container text-black border-[3px] border-black shadow-brutal text-style-label-bold uppercase px-3 md:px-6 py-2 press-effect hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <span className="hidden sm:inline">Coba 1 Menit Gratis</span>
            <span className="sm:hidden text-xs">Coba</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
