'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LoadingBar } from '@/components/LoadingBar';
import { mixpanelService } from '@/lib/mixpanel';

interface LandingCardProps {
  onComplete: () => void;
}

export function LandingCard({ onComplete }: LandingCardProps) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleBegin = () => {
    setIsLoading(true);
    mixpanelService.track('Begin Button Clicked', {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Animate from 0 to 100 over 5000ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          mixpanelService.track('Loading Bar Completed', {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          });
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 2; // 2% per 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    // Track landing page view when component mounts
    mixpanelService.track('Landing Page Viewed', {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });
  }, []);

  return (
    <motion.div
      className="flex w-full max-w-4xl flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      {/* Main heading */}
      <h1 className="mb-6 text-center text-5xl font-bold text-white">
        Stop guessing with your marketing
      </h1>

      {/* Subtext */}
      <p className="mb-12 max-w-2xl text-center text-base leading-relaxed text-slate-400">
        Discover where your ideal customers pay attention online, backed by real
        data and insights.
      </p>

      {/* Begin button or loading bar */}
      {!isLoading ? (
        <button
          onClick={handleBegin}
          className="rounded-xl bg-[#1e52f1] px-12 py-4 text-lg font-medium text-white transition-all hover:bg-[#1e52f1]/90"
        >
          Begin
        </button>
      ) : (
        <div className="w-full max-w-md">
          <LoadingBar progress={progress} />
        </div>
      )}
    </motion.div>
  );
}
