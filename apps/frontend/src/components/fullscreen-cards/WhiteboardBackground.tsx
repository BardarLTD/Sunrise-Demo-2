'use client';

export function WhiteboardBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-[#222221]" />

      {/* Hash grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1D1D1C 2px, transparent 2px),
            linear-gradient(to bottom, #1D1D1C 2px, transparent 2px)
          `,
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  );
}
