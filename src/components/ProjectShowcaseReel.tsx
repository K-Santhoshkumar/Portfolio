"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from "lucide-react";

interface ProjectShowcaseReelProps {
  screenshots: string[];
  title: string;
}

function ReelImage({
  src,
  alt,
  fill,
  priority,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <Image
      src={failed ? "/portfolio_logo.png" : src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      onError={() => {
        if (!failed) {
          setFailed(true);
        }
      }}
    />
  );
}

export default function ProjectShowcaseReel({
  screenshots,
  title,
}: ProjectShowcaseReelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  // Auto-advance slideshow every 4 seconds when playing
  useEffect(() => {
    if (screenshots.length <= 1 || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [screenshots.length, isPlaying, currentIndex]);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const activeSrc = screenshots[currentIndex] || screenshots[0];

  return (
    <div className="space-y-4">
      {/* Main Showcase Viewport */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#101216] border border-[#252A32] shadow-2xl group">
        <ReelImage
          src={activeSrc}
          alt={`${title} screenshot ${currentIndex + 1}`}
          fill
          priority
          className="object-cover object-top transition-all duration-500"
        />

        {/* Top Control Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Screenshot Index Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#090A0C]/85 backdrop-blur-md border border-[#252A32] text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F933]" />
            <span className="text-[#D4F933] font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[#656B75]">/</span>
            <span className="text-[#92969F]">
              {String(screenshots.length).padStart(2, "0")}
            </span>
          </div>

          {/* Action Controls: Play/Pause & Fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-[#090A0C]/85 hover:bg-[#161A20] backdrop-blur-md border border-[#252A32] text-[#92969F] hover:text-[#D4F933] transition-colors"
              title={isPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            <button
              onClick={() => setFullscreen(true)}
              className="p-2 rounded-full bg-[#090A0C]/85 hover:bg-[#161A20] backdrop-blur-md border border-[#252A32] text-[#92969F] hover:text-[#D4F933] transition-colors"
              title="Fullscreen Preview"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* Previous & Next Arrow Controls */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={goLeft}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#090A0C]/80 hover:bg-[#161A20] backdrop-blur-md border border-[#252A32] text-[#F2F2EE] hover:text-[#D4F933] transition-all opacity-80 group-hover:opacity-100"
              aria-label="Previous Screenshot"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={goRight}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-[#090A0C]/80 hover:bg-[#161A20] backdrop-blur-md border border-[#252A32] text-[#F2F2EE] hover:text-[#D4F933] transition-all opacity-80 group-hover:opacity-100"
              aria-label="Next Screenshot"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Bottom Autoplay Progress Bar */}
        {isPlaying && screenshots.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#252A32] z-20">
            <div
              key={currentIndex}
              className="h-full bg-[#D4F933] transition-all duration-[4000ms] ease-linear w-full origin-left"
              style={{
                animation: "progress 4s linear",
              }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {screenshots.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#656B75] px-1">
            <span className="flex items-center gap-1.5">
              <Layers size={12} className="text-[#D4F933]" />
              <span>PREVIEW GALLERY ({screenshots.length} CAPTURES)</span>
            </span>
            <span>CLICK TO INSPECT</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {screenshots.map((shot, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(false);
                }}
                className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border transition-all ${
                  currentIndex === idx
                    ? "border-[#D4F933] shadow-[0_0_12px_rgba(212,249,51,0.35)] scale-105"
                    : "border-[#252A32] opacity-60 hover:opacity-100 hover:border-[#656B75]"
                }`}
              >
                <ReelImage
                  src={shot}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Modal View */}
      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-[#090A0C]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#161A20] border border-[#252A32] text-[#F2F2EE] hover:text-[#D4F933] transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative w-full max-w-6xl aspect-[16/10] max-h-[85vh] rounded-2xl overflow-hidden border border-[#252A32]">
            <Image
              src={activeSrc}
              alt={`${title} enlarged`}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-xs text-[#92969F] bg-[#161A20] px-4 py-2 rounded-full border border-[#252A32]">
            <span>{currentIndex + 1} / {screenshots.length}</span>
            <span>•</span>
            <span>{title}</span>
          </div>
        </div>
      )}
    </div>
  );
}

