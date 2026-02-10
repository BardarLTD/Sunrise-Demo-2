'use client';

import { motion } from 'framer-motion';

interface LoadingBarProps {
  progress: number; // 0-100
  className?: string;
}

// Interpolate between two colors
function interpolateColor(
  color1: string,
  color2: string,
  factor: number,
): string {
  // Parse hex colors
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;

  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;

  // Interpolate
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function LoadingBar({ progress, className = '' }: LoadingBarProps) {
  const blocks = Array.from({ length: 10 }, (_, i) => i);
  const filledBlocks = Math.floor((progress / 100) * 10);

  return (
    <div
      className={`relative flex gap-1 ${className}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-live="polite"
    >
      {blocks.map((blockIndex) => {
        const isFilled = blockIndex < filledBlocks;
        // Calculate color for this block (red to blue)
        const factor = blockIndex / 9; // 0 to 1 across 10 blocks
        const blockColor = interpolateColor('#C2052B', '#0166C6', factor);

        return (
          <motion.div
            key={blockIndex}
            className="h-8 w-full rounded-sm"
            style={{
              backgroundColor: isFilled ? blockColor : '#595854',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.3,
              delay: blockIndex * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}
