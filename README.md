# 🎙️ NARA.AI — INTERVIEW SIMULATOR

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Better-Auth](https://img.shields.io/badge/Auth-Better--Auth-yellow?style=for-the-badge)](https://www.better-auth.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

**Nara.AI** adalah simulator wawancara kerja berbasis AI yang memungkinkan pengguna berlatih interview secara lisan (voice-to-voice) dengan feedback instan yang mendalam. Dibangun dengan estetika **Neubrutalism** yang berani dan teknologi AI mutakhir.

---

## ⚡ TECH STACK

- **Framework:** [Next.js 15+](https://nextjs.org) (App Router)
- **Voice AI:** [Vapi AI](https://vapi.ai) (Real-time Voice Orchestration)
- **Database:** [Supabase](https://supabase.com) (PostgreSQL)
- **ORM:** [Prisma](https://prisma.io)
- **Auth:** [Better-Auth](https://www.better-auth.com)
- **Styling:** Tailwind CSS (Brutalist Theme)
- **Animations:** Framer Motion

---

## 🚀 FITUR UTAMA

- **Real-time Voice Interview:** Simulasi percakapan lisan dengan Nara (AI Interviewer).
- **AI Feedback Engine:** Analisa otomatis terhadap Komunikasi, Teknikal, dan Kepercayaan Diri.
- **Smart Dashboard:** Pantau riwayat sesi dan grafik perkembangan performa Anda.
- **Interactive Transcripts:** Lihat kembali seluruh percakapan Anda dengan Nara.
- **Brutalist UI:** Antarmuka yang unik, kontras, dan responsif.

---

## 🛠️ CARA INSTALASI

### 1. Clone Repository
```bash
git clone https://github.com/username/nara-ai.git
cd nara-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di root direktori dan isi dengan:
```env
# Database (Supabase)
DATABASE_URL="your_postgresql_url"
DIRECT_URL="your_direct_url"

# Better Auth
BETTER_AUTH_SECRET="your_secret_key"
BETTER_AUTH_URL="http://localhost:3000"

# Vapi AI
NEXT_PUBLIC_VAPI_PUBLIC_KEY="your_vapi_public_key"
```

### 4. Sinkronisasi Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```

---

## 📂 STRUKTUR FOLDER

- `src/app/dashboard` — Panel utama pengguna & analitik.
- `src/app/interview` — Interface simulasi voice interview.
- `src/app/feedback` — Halaman laporan hasil evaluasi AI.
- `src/app/api` — Backend endpoint untuk Auth dan data Interview.
- `prisma/` — Skema database dan migrasi.

---

## 🎨 DESIGN PHILOSOPHY

Nara.AI mengadopsi **Brutalist Design**:
- Border tebal (4px) & hitam pekat.
- Shadow yang tegas (Hard Shadows).
- Warna kontras tinggi (Yellow, Blue, Red).
- Tipografi yang bold dan uppercase.

---

## 📄 LISENSI

Proyek ini berada di bawah lisensi MIT.

---

<p align="center">
  Dibuat dengan ❤️ oleh <b>KAMAL</b>
</p>
