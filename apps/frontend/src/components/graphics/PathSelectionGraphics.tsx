import type React from 'react';

export const DiscoverGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Magnifying glass handle */}
      <line
        x1="120"
        y1="85"
        x2="145"
        y2="110"
        stroke="#8b5cf6"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Magnifying glass circle */}
      <circle
        cx="95"
        cy="60"
        r="35"
        stroke="#8b5cf6"
        strokeWidth="4"
        fill="none"
      />

      {/* Data points inside magnifying glass */}
      <circle cx="85" cy="50" r="4" fill="#1e52f1" />
      <circle cx="105" cy="55" r="4" fill="#1e52f1" />
      <circle cx="90" cy="70" r="4" fill="#1e52f1" />
      <circle cx="100" cy="45" r="4" fill="#10b981" />

      {/* Small data points outside magnifying glass (faded) */}
      <circle cx="40" cy="40" r="3" fill="#595854" opacity="0.5" />
      <circle cx="50" cy="70" r="3" fill="#595854" opacity="0.5" />
      <circle cx="35" cy="60" r="3" fill="#595854" opacity="0.5" />
      <circle cx="155" cy="35" r="3" fill="#595854" opacity="0.5" />
      <circle cx="165" cy="50" r="3" fill="#595854" opacity="0.5" />
    </svg>
  );
};

export const ActivateGraphic: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Rocket body */}
      <path
        d="M 100 20 L 110 60 L 100 70 L 90 60 Z"
        fill="#1e52f1"
        stroke="#1e52f1"
        strokeWidth="2"
      />

      {/* Rocket window */}
      <circle cx="100" cy="40" r="6" fill="#8b5cf6" />

      {/* Rocket fins */}
      <path d="M 90 60 L 75 75 L 90 70 Z" fill="#8b5cf6" />
      <path d="M 110 60 L 125 75 L 110 70 Z" fill="#8b5cf6" />

      {/* Rocket flame */}
      <path d="M 95 70 L 90 85 L 100 80 Z" fill="#ef4444" opacity="0.8" />
      <path d="M 105 70 L 110 85 L 100 80 Z" fill="#f97316" opacity="0.8" />
      <path d="M 95 80 L 100 95 L 105 80 Z" fill="#fbbf24" opacity="0.8" />

      {/* Motion trail/stars */}
      <circle cx="70" cy="45" r="3" fill="#10b981" opacity="0.6" />
      <circle cx="60" cy="60" r="3" fill="#10b981" opacity="0.4" />
      <circle cx="130" cy="50" r="3" fill="#10b981" opacity="0.6" />
      <circle cx="140" cy="65" r="3" fill="#10b981" opacity="0.4" />

      {/* Target rings in background */}
      <circle
        cx="100"
        cy="100"
        r="15"
        stroke="#595854"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle
        cx="100"
        cy="100"
        r="25"
        stroke="#595854"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
};
