import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-cyan-500 mb-4">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-6 py-3 rounded bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors">Back to Home</Link>
    </div>
  );
} 