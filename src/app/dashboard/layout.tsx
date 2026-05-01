"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

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
    { name: "Mulai Interview", href: "/interview", icon: "mic" },
    { name: "Riwayat", href: "/dashboard/history", icon: "history" },
    { name: "Performa", href: "/dashboard/performance", icon: "analytics" },
  ];

  if (isPending || !session) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-surface">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="flex h-screen bg-surface selection:bg-primary-container selection:text-text-main overflow-hidden">
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full flex-col z-40 bg-white border-r-4 border-black shadow-brutal-sidebar w-80 hidden md:flex">
        {/* Logo Section */}
        <div className="p-6 border-b-4 border-black flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-primary-container flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                fill="black"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-black text-xl text-black uppercase tracking-tighter">
              NARA.AI
            </h2>
            <p className="text-style-label-bold text-zinc-500 uppercase tracking-wider">
              Interview Simulator
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 flex-grow">
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
        <div className="p-4 border-t-4 border-black">
          <nav className="space-y-2">
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
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 w-full">
        {/* TopNavBar */}
        <header className="flex justify-between items-center h-16 px-6 w-full top-0 border-b-4 border-black bg-white shadow-brutal z-30">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <h1 className="text-2xl font-black italic tracking-tighter text-black uppercase">
                NARA.AI
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-black hover:bg-yellow-400 hover:text-black transition-colors p-2 rounded-full border-2 border-transparent hover:border-black press-effect">
              <span className="material-symbols-outlined text-[28px]">
                notifications
              </span>
            </button>
            <button className="text-black hover:bg-yellow-400 hover:text-black transition-colors p-2 rounded-full border-2 border-transparent hover:border-black press-effect">
              <span className="material-symbols-outlined text-[28px]">
                settings
              </span>
            </button>
            <div className="flex items-center gap-3 ml-2 px-3 py-1 border-2 border-black bg-primary-container shadow-brutal-sm">
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
