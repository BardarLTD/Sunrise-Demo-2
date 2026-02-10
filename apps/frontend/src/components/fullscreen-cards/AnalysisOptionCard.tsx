'use client';

import type React from 'react';

interface AnalysisOptionCardProps {
  title: string;
  description: string;
  graphic: React.ReactNode;
  onClick?: () => void;
  variant?: 'feedback' | 'navigation';
}

export const AnalysisOptionCard: React.FC<AnalysisOptionCardProps> = ({
  title,
  description,
  graphic,
  onClick,
  variant = 'feedback',
}) => {
  return (
    <div
      className={`
        group relative flex w-full cursor-pointer flex-col
        overflow-hidden rounded-[clamp(0.5rem,1vmin,1rem)] border border-[#595854] bg-[#2A2A29]
        transition-all duration-300 hover:scale-[1.02] hover:border-white/20
        ${variant === 'navigation' ? 'hover:ring-2 hover:ring-[#1e52f1]/50' : ''}
      `}
      style={{
        height: 'clamp(180px, 35vh, 350px)',
      }}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        style={{
          backgroundImage: 'url(/gradient-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Graphic section - 60% height */}
      <div
        className="relative z-10 flex h-[60%] items-center justify-center"
        style={{ padding: 'clamp(0.75rem, 2vmin, 1.5rem)' }}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ maxWidth: 'clamp(100px, 15vmin, 200px)' }}
        >
          <div className="flex h-full w-full items-center justify-center">
            {graphic}
          </div>
        </div>
      </div>

      {/* Text content section - 40% height */}
      <div
        className="relative z-10 flex h-[40%] flex-col justify-center border-t border-[#595854] text-center"
        style={{ padding: 'clamp(0.75rem, 2vmin, 1.5rem)' }}
      >
        <h3
          className="mb-1 font-bold text-white"
          style={{ fontSize: 'clamp(0.875rem, 2.5vmin, 1.25rem)' }}
        >
          {title}
        </h3>
        <p
          className="leading-tight text-slate-400 italic"
          style={{ fontSize: 'clamp(0.625rem, 1.5vmin, 0.875rem)' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
