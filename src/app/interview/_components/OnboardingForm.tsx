import { useState } from "react";
import type { InterviewConfig } from "@/lib/vapi";

const PRESET_ROLES = {
  "Frontend Developer": {
    roleDescription: "Mengembangkan antarmuka interaktif dengan React.js dan memastikan performa website yang optimal.",
    keySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    questions: [
      "Ceritakan pengalaman paling berkesan saat Anda membuat aplikasi dengan React.",
      "Bagaimana cara Anda menangani state management pada aplikasi dengan skala besar?",
      "Ceritakan cara Anda mengoptimalkan performa rendering di Next.js atau React."
    ]
  },
  "Backend Developer": {
    roleDescription: "Membangun sistem backend yang scalable, mengelola database, dan merancang API RESTful/GraphQL.",
    keySkills: ["Node.js", "Express", "PostgreSQL", "System Design"],
    questions: [
      "Bagaimana Anda merancang arsitektur database untuk aplikasi e-commerce?",
      "Ceritakan cara Anda menangani security dan authentikasi pada API.",
      "Pernahkah Anda mengalami isu bottleneck performa pada backend? Bagaimana solusinya?"
    ]
  },
  "UI/UX Designer": {
    roleDescription: "Merancang pengalaman pengguna yang intuitif dan antarmuka yang menarik dengan Figma.",
    keySkills: ["Figma", "User Research", "Prototyping", "Wireframing"],
    questions: [
      "Bagaimana proses Anda saat memulai desain fitur baru dari nol?",
      "Bagaimana cara Anda memvalidasi desain Anda dengan user?",
      "Ceritakan pengalaman Anda menangani feedback dari developer atau stakeholder yang kurang setuju dengan desain Anda."
    ]
  }
};

export default function OnboardingForm({ onSubmit }: { onSubmit: (config: InterviewConfig) => void }) {
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("Frontend Developer");
  const [customRole, setCustomRole] = useState("");
  const [level, setLevel] = useState<"junior" | "mid" | "senior">("mid");
  
  const [customDescription, setCustomDescription] = useState("");
  const [customSkills, setCustomSkills] = useState("");
  const [customQuestions, setCustomQuestions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName) {
      alert("Nama kandidat harus diisi!");
      return;
    }

    if (role === "Custom") {
      if (!customRole || !customDescription || !customSkills || !customQuestions) {
        alert("Harap lengkapi semua field custom!");
        return;
      }
      onSubmit({
        candidateName,
        role: customRole,
        level,
        roleDescription: customDescription,
        keySkills: customSkills.split(",").map((s) => s.trim()).filter(Boolean),
        questions: customQuestions.split("\n").map((q) => q.trim()).filter(Boolean),
      });
    } else {
      const preset = PRESET_ROLES[role as keyof typeof PRESET_ROLES];
      onSubmit({
        candidateName,
        role,
        level,
        roleDescription: preset.roleDescription,
        keySkills: preset.keySkills,
        questions: preset.questions,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 relative z-20">
      <div className="w-full max-w-2xl bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-4">
          Persiapan Wawancara
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* NAMA */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-sm tracking-tight">Nama Kandidat</label>
            <input 
              type="text" 
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Masukkan nama kamu..."
              className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none focus:bg-primary-container/20 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* ROLE */}
            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-tight">Posisi (Role)</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none cursor-pointer appearance-none"
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
              >
                {Object.keys(PRESET_ROLES).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
                <option value="Custom">Custom Role (Isi Sendiri)</option>
              </select>
            </div>

            {/* LEVEL */}
            <div className="flex flex-col gap-2">
              <label className="font-bold uppercase text-sm tracking-tight">Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full bg-surface border-4 border-black px-4 py-3 font-medium outline-none cursor-pointer appearance-none"
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(135deg, black 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="junior">Junior</option>
                <option value="mid">Mid-Level</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* CUSTOM FIELDS */}
          {role === "Custom" && (
            <div className="flex flex-col gap-6 p-6 border-4 border-dashed border-black bg-surface-container-high/30 mt-2">
              <h3 className="font-black uppercase tracking-tight text-lg mb-2">Konfigurasi Custom Role</h3>
              
              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-tight">Nama Posisi</label>
                <input 
                  type="text" 
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Cth: Data Analyst"
                  className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-tight">Deskripsi Peran</label>
                <textarea 
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Cth: Menganalisa data untuk strategi bisnis..."
                  className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none resize-y min-h-[80px]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-tight">Key Skills (Pisahkan dengan koma)</label>
                <input 
                  type="text" 
                  value={customSkills}
                  onChange={(e) => setCustomSkills(e.target.value)}
                  placeholder="Cth: Python, SQL, Tableau"
                  className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold uppercase text-sm tracking-tight">Daftar Pertanyaan (Satu baris satu pertanyaan)</label>
                <textarea 
                  value={customQuestions}
                  onChange={(e) => setCustomQuestions(e.target.value)}
                  placeholder="Coba ceritakan project analisis data terakhirmu...&#10;Bagaimana caramu presentasi ke non-tech?"
                  className="w-full bg-white border-4 border-black px-4 py-3 font-medium outline-none resize-y min-h-[120px]"
                />
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-primary-container text-black font-black uppercase tracking-tighter text-xl py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all mt-4"
          >
            Mulai Interview
          </button>
        </form>
      </div>
    </div>
  );
}
