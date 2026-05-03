export function LoadingState() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-surface bg-dot-pattern selection:bg-primary-container">
      <div className="flex flex-col items-center gap-6 p-12 bg-white border-4 border-black shadow-brutal max-w-2xl w-full text-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            Menganalisa Sesi
          </h2>
          <p className="text-on-surface-variant text-sm font-medium">
            Nara.AI sedang memproses transkrip dan merumuskan feedback
            untukmu...
          </p>
        </div>
      </div>
    </div>
  );
}
