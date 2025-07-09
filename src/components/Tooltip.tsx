"use client";

import { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}
export function Tooltip({ children, content }: TooltipProps) {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap">
          {content}
          <div className="absolute top-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
