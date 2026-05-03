import Link from "next/link";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-black pb-4 gap-4 md:gap-0">
      <div>
        <h1 className="text-4xl md:text-style-h1 text-text-main uppercase font-black tracking-tight">Overview</h1>
        <p className="text-base md:text-style-body-lg text-on-surface-variant mt-2">
          Selamat datang kembali, <span className="font-bold">{userName}</span>.
          Pantau metrik performa kamu.
        </p>
      </div>
      <Link
        href="/interview"
        className="flex w-full md:w-auto justify-center bg-[#FFD600] text-black border-[3px] border-black shadow-brutal text-style-h3 uppercase px-6 py-3 md:px-8 md:py-3 press-effect transition-all items-center gap-2"
      >
        <span className="material-symbols-outlined">play_arrow</span>
        Mulai Sesi Baru
      </Link>
    </div>
  );
}
