export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-cyan-400 text-lg font-semibold">Loading projects...</p>
    </div>
  );
}
