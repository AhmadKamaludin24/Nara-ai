import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "NARA.AI - AI Voice Interview Simulator",
    template: "%s | NARA.AI",
  },
  description:
    "Platform simulasi interview kerja berbasis AI voice real-time. Latih kemampuan interview kamu dengan Nara, AI interviewer yang cerdas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-style-body-md bg-surface text-on-background min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
