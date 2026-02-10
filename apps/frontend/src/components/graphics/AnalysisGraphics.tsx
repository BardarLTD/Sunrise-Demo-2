import type React from 'react';

export const ProductInsightsGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Bar chart */}
      <rect x="30" y="70" width="20" height="30" fill="#1e52f1" opacity="0.6" />
      <rect x="60" y="55" width="20" height="45" fill="#1e52f1" opacity="0.7" />
      <rect x="90" y="40" width="20" height="60" fill="#1e52f1" opacity="0.8" />
      <rect x="120" y="25" width="20" height="75" fill="#1e52f1" />

      {/* Trend line */}
      <path
        d="M 35 75 L 65 60 L 95 45 L 125 30"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Upward arrows - vertically aligned */}
      <path
        d="M 150 35 L 160 25 L 170 35"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 150 55 L 160 45 L 170 55"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export const PartnershipsGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Central node */}
      <circle cx="100" cy="60" r="15" fill="#1e52f1" />

      {/* Satellite nodes */}
      <circle cx="50" cy="30" r="10" fill="#8b5cf6" opacity="0.8" />
      <circle cx="150" cy="30" r="10" fill="#8b5cf6" opacity="0.8" />
      <circle cx="50" cy="90" r="10" fill="#8b5cf6" opacity="0.8" />
      <circle cx="150" cy="90" r="10" fill="#8b5cf6" opacity="0.8" />

      {/* Connections */}
      <line x1="100" y1="60" x2="50" y2="30" stroke="#595854" strokeWidth="2" />
      <line
        x1="100"
        y1="60"
        x2="150"
        y2="30"
        stroke="#595854"
        strokeWidth="2"
      />
      <line x1="100" y1="60" x2="50" y2="90" stroke="#595854" strokeWidth="2" />
      <line
        x1="100"
        y1="60"
        x2="150"
        y2="90"
        stroke="#595854"
        strokeWidth="2"
      />

      {/* Connection between satellites */}
      <line
        x1="50"
        y1="30"
        x2="150"
        y2="30"
        stroke="#595854"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="50"
        y1="90"
        x2="150"
        y2="90"
        stroke="#595854"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
};

export const ContentInsightsGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Document outline */}
      <rect
        x="50"
        y="20"
        width="100"
        height="80"
        rx="4"
        stroke="#595854"
        strokeWidth="2"
        fill="#2A2A29"
      />

      {/* Document lines with trend indicators */}
      <line x1="60" y1="35" x2="120" y2="35" stroke="#1e52f1" strokeWidth="2" />
      <circle cx="130" cy="35" r="3" fill="#10b981" />

      <line x1="60" y1="50" x2="110" y2="50" stroke="#1e52f1" strokeWidth="2" />
      <circle cx="120" cy="50" r="3" fill="#10b981" />

      <line x1="60" y1="65" x2="130" y2="65" stroke="#1e52f1" strokeWidth="2" />
      <circle cx="140" cy="65" r="3" fill="#10b981" />

      <line x1="60" y1="80" x2="100" y2="80" stroke="#1e52f1" strokeWidth="2" />
      <circle cx="110" cy="80" r="3" fill="#10b981" />

      {/* Trending arrow */}
      <path
        d="M 155 40 L 170 25 L 185 40"
        stroke="#10b981"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="170"
        y1="25"
        x2="170"
        y2="70"
        stroke="#10b981"
        strokeWidth="2"
      />
    </svg>
  );
};

export const CompetitorsGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* You bar - tallest */}
      <rect x="40" y="30" width="30" height="70" fill="#10b981" />

      {/* Competitor 1 */}
      <rect x="85" y="50" width="30" height="50" fill="#595854" opacity="0.6" />

      {/* Competitor 2 */}
      <rect
        x="130"
        y="60"
        width="30"
        height="40"
        fill="#595854"
        opacity="0.6"
      />

      {/* Crown/star on You bar */}
      <path
        d="M 55 15 L 58 22 L 66 22 L 59 27 L 62 35 L 55 30 L 48 35 L 51 27 L 44 22 L 52 22 Z"
        fill="#8b5cf6"
      />
    </svg>
  );
};
