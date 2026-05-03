import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Pengecekan instan via Cookie untuk menghindari latency saat pindah halaman (Route Transition)
  const sessionCookie = request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // Jika tidak ada cookie sesi sama sekali, langsung lempar ke login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika cookie ada, biarkan lewat secara instan!
  // Validasi mendalam (apakah sesi expired/dicabut) tetap dilakukan di API Routes.
  return NextResponse.next();
}

// Konfigurasi route mana saja yang harus melewati middleware ini
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/interview",
    "/interview/:path*",
    "/feedback",
    "/feedback/:path*",
    // /f/:path* adalah halaman publik — TIDAK diproteksi
  ],
};
