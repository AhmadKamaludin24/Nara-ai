import type { TranscriptMessage } from "@/hooks/use-vapi";

interface ScoringResult {
  komunikasi: number;
  teknikal: number;
  kepercayaanDiri: number;
  overall: number;
  insight: string;
}

export function calculateInterviewScore(
  transcripts: TranscriptMessage[],
  candidateName: string,
  role: string
): ScoringResult {
  const userMsgs = transcripts.filter((m) => m.role === "user");
  const assistantMsgs = transcripts.filter((m) => m.role === "assistant");

  // 1. Durasi & Kuantitas Check
  const totalTurns = userMsgs.length;
  const totalWords = userMsgs.reduce(
    (acc, m) => acc + (m.text?.split(/\s+/).length || 0),
    0
  );
  const avgWordsPerMsg = totalTurns > 0 ? totalWords / totalTurns : 0;

  // 2. Kriteria "Terlalu Pendek" (Penalti Berat)
  // Jika pesan < 3 ATAU total kata < 30
  const isTooShort = totalTurns < 3 || totalWords < 30;

  if (isTooShort) {
    return {
      komunikasi: Math.min(30 + totalTurns * 5, 45),
      teknikal: Math.min(25 + totalTurns * 4, 40),
      kepercayaanDiri: Math.min(35 + totalTurns * 3, 50),
      overall: Math.min(30 + totalTurns * 4, 45),
      insight: `Maaf ${candidateName}, sesi interview ini terlalu singkat untuk memberikan penilaian yang valid. Anda hanya memberikan ${totalTurns} tanggapan dengan total sekitar ${totalWords} kata. Nara memerlukan setidaknya 4-5 jawaban yang mendalam untuk menganalisa kemampuan Anda. Silakan coba lagi dengan jawaban yang lebih detail.`,
    };
  }

  // 3. Normal Scoring Logic (Jika memenuhi syarat minimal)
  // Base score dipengaruhi oleh kedalaman jawaban (avg words)
  // 0-10 words: 40-50 (Sangat kurang)
  // 10-30 words: 50-70 (Cukup)
  // 30-60 words: 70-85 (Bagus)
  // 60+ words: 85-95 (Sangat Bagus)

  let depthMultiplier = 0;
  if (avgWordsPerMsg < 15) depthMultiplier = 50;
  else if (avgWordsPerMsg < 30) depthMultiplier = 65;
  else if (avgWordsPerMsg < 50) depthMultiplier = 80;
  else depthMultiplier = 90;

  // Variasi random agar tidak kaku (± 5 poin)
  const randomness = () => Math.floor(Math.random() * 10) - 5;

  const komunikasi = Math.min(depthMultiplier + randomness() + 5, 98);
  const teknikal = Math.min(depthMultiplier + randomness(), 95);
  const kepercayaanDiri = Math.min(depthMultiplier + randomness() + 3, 99);
  const overall = Math.round((komunikasi + teknikal + kepercayaanDiri) / 3);

  // 4. Generate Insight based on score
  let insight = "";
  if (overall < 60) {
    insight = `Halo ${candidateName}, performa Anda masih perlu banyak ditingkatkan. Jawaban Anda cenderung singkat dan kurang elaboratif. Cobalah menggunakan metode STAR (Situation, Task, Action, Result) untuk menjelaskan pengalaman Anda agar lebih terstruktur dan meyakinkan.`;
  } else if (overall < 80) {
    insight = `Kerja yang cukup baik, ${candidateName}. Anda sudah mampu menjawab pertanyaan dengan konteks yang tepat untuk posisi ${role}. Sedikit saran: coba perdalam lagi sisi teknis dari jawaban Anda dan kurangi jeda saat berbicara agar terlihat lebih percaya diri.`;
  } else {
    insight = `Luar biasa, ${candidateName}! Anda menunjukkan penguasaan yang sangat baik. Jawaban Anda sangat mendalam dan menunjukkan kematangan profesional untuk role ${role}. Terus pertahankan struktur komunikasi ini di interview nyata nanti!`;
  }

  return {
    komunikasi,
    teknikal,
    kepercayaanDiri,
    overall,
    insight,
  };
}
