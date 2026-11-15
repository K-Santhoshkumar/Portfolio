import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="w-16 h-16 rounded-2xl bg-[#161A20] border border-[#252A32] flex items-center justify-center mb-6 text-[#D4F933] shadow-lg shadow-[#D4F933]/5">
        <Compass size={28} />
      </div>

      <span className="text-xs font-mono text-[#D4F933] font-semibold tracking-wider uppercase mb-2">
        Error 404
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F2F2EE] tracking-tight mb-3">
        Page Not Located
      </h1>

      <p className="text-sm text-[#92969F] max-w-md mb-8 leading-relaxed">
        The requested resource, case study, or view does not exist or has been moved to a new route.
      </p>

      <Link href="/" className="lime-btn text-xs px-5 py-2.5 inline-flex items-center gap-2">
        <ArrowLeft size={14} />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
