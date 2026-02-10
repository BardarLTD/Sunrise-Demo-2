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
        group relative flex h-[300px] lg:h-[350px] w-full cursor-pointer flex-col
        overflow-hidden rounded-2xl border border-[#595854] bg-[#2A2A29]
        transition-all duration-300 hover:scale-[1.02] hover:border-white/20
        ${variant === 'navigation' ? 'hover:ring-2 hover:ring-[#1e52f1]/50' : ''}
      `}
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
      <div className="relative z-10 flex h-[60%] items-center justify-center p-6">
        <div className="h-full w-full max-w-[200px]">{graphic}</div>
      </div>

      {/* Text content section - 40% height */}
      <div className="relative z-10 flex h-[40%] flex-col justify-center border-t border-[#595854] p-6">
        <h3 className="mb-2 text-lg font-bold text-white lg:text-xl">
          {title}
        </h3>
        <p className="text-xs text-slate-400 lg:text-sm">{description}</p>
      </div>
    </div>
  );
};
