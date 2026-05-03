"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { NaraLogo } from "@/components/ui/NaraLogo";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Close sidebar on path change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Riwayat", href: "/dashboard/history", icon: "history" },
    { name: "Performa", href: "/dashboard/performance", icon: "analytics" },
  ];

  if (isPending || !session) {
    return <LoadingScreen fullScreen cycling />;
  }

  const user = session.user;

  return (
    <div className="flex h-screen bg-surface selection:bg-primary-container selection:text-text-main overflow-hidden">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`
        fixed left-0 top-0 h-full flex flex-col z-50 bg-white border-r-4 border-black shadow-brutal-sidebar w-80 
        transition-transform duration-300 md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b-4 border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <NaraLogo size={48} />
            <div>
              <h2 className="font-black text-xl text-black uppercase tracking-tighter">
                NARA.AI
              </h2>
              <p className="text-style-label-bold text-zinc-500 uppercase tracking-wider text-[10px]">
                Interview Simulator
              </p>
            </div>
          </div>
          <button
            className="md:hidden text-black p-1 border-2 border-black bg-surface hover:bg-yellow-400"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-grow overflow-y-auto">
          <Link href="/interview" className="block w-full text-center bg-[#FFD600] text-black border-[3px] border-black shadow-brutal text-style-h3 uppercase py-3 mb-8 press-effect transition-all hover:-translate-y-1">
            Sesi Baru
          </Link>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 font-bold text-sm uppercase tracking-wide transition-all px-4 py-3
                    ${isActive
                      ? "bg-yellow-400 text-black border-2 border-black shadow-brutal mx-1"
                      : "text-black hover:bg-blue-600 hover:text-white"
                    }
                  `}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Nav */}
        <div className="p-4 border-t-4 border-black bg-zinc-50">
          <nav className="space-y-2 mb-4">
            <a
              href="#"
              className="text-black px-4 py-3 flex items-center gap-3 font-bold text-sm uppercase tracking-wide hover:bg-blue-600 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined">help</span>
              Bantuan
            </a>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full text-black px-4 py-3 flex items-center gap-3 font-bold text-sm uppercase tracking-wide hover:bg-accent-red hover:text-white transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined">logout</span>
              {isLoggingOut ? "Keluar..." : "Keluar"}
            </button>
          </nav>

          {/* Credit */}
          <div className="px-4 py-2 border-t-2 border-zinc-200 mt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">A Project By</span>
            <a
              href="https://github.com/AhmadKamaludin24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black uppercase tracking-wider hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              Ahmad Kamaludin
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-80 w-full">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-4 md:px-6 w-full top-0 border-b-4 border-black bg-white shadow-brutal z-30">
          <div className="flex items-center gap-3">
            {/* Hamburger Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden flex items-center justify-center p-2 border-2 border-black bg-white shadow-brutal-sm hover:bg-yellow-400 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <span className="material-symbols-outlined font-black">menu</span>
            </button>

            <div className="flex items-center gap-2 md:hidden">
              <h1 className="text-lg font-black italic tracking-tighter text-black uppercase">
                NARA.AI
              </h1>
            </div>
            {/* Status Badge (Desktop & Mobile) */}
            {process.env.NEXT_PUBLIC_VAPI_STATUS !== "INACTIVE" ? (
              <div className="flex items-center gap-1.5 bg-[#4ade80] text-black px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Aktif</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-[9px] font-black uppercase tracking-widest leading-none mt-0.5">Off</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="hidden sm:flex text-black hover:bg-yellow-400 hover:text-black transition-colors p-2 rounded-full border-2 border-transparent hover:border-black press-effect">
              <span className="material-symbols-outlined text-[24px]">
                notifications
              </span>
            </button>
            <div className="flex items-center gap-3 ml-1 md:ml-2 px-2 md:px-3 py-1 border-2 border-black bg-primary-container shadow-brutal-sm">
              <span className="font-bold text-xs uppercase hidden sm:block">{user.name}</span>
              <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-white flex items-center justify-center">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-[20px] text-black">
                    person
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Canvas */}
        <main className="flex-1 overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
