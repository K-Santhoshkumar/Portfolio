"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="w-16 h-16 rounded-2xl bg-[#161A20] border border-[#252A32] flex items-center justify-center mb-6 text-red-400 shadow-lg shadow-red-500/5">
        <AlertTriangle size={28} />
      </div>

      <span className="text-xs font-mono text-red-400 font-semibold tracking-wider uppercase mb-2">
        Execution Interrupted
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F2F2EE] tracking-tight mb-3">
        Unexpected Application State
      </h1>

      <p className="text-xs text-[#92969F] max-w-md mb-8 leading-relaxed font-mono">
        {error?.message || "An unexpected runtime error occurred while rendering this view."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="lime-btn text-xs px-5 py-2.5 inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw size={14} />
          <span>Retry Operation</span>
        </button>

        <Link
          href="/"
          className="btn-secondary text-xs px-5 py-2.5 inline-flex items-center gap-2"
        >
          <Home size={14} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

