import Link from "next/link";

export function Footer() {
  return (
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
            <a
              href="#cara-kerja"
              className="hover:text-text-main transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#feedback"
              className="hover:text-text-main transition-colors"
            >
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
  );
}
