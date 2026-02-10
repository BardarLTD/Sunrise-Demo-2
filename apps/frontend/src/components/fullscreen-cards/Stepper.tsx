'use client';

interface StepperProps {
  steps: number;
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const canGoUp = currentStep > 0;
  const canGoDown = currentStep < steps - 1;

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
      <div className="flex flex-col items-center gap-1 rounded-2xl border border-[#595854] bg-[#2A2A29] p-2">
        {/* Up Arrow */}
        <button
          onClick={() => canGoUp && onStepClick(currentStep - 1)}
          disabled={!canGoUp}
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-300 ${
            canGoUp
              ? 'text-white hover:bg-[#3a3a3a]'
              : 'text-slate-700 cursor-not-allowed'
          }`}
        >
          ↑
        </button>

        {/* Down Arrow */}
        <button
          onClick={() => canGoDown && onStepClick(currentStep + 1)}
          disabled={!canGoDown}
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-all duration-300 ${
            canGoDown
              ? 'text-white hover:bg-[#3a3a3a]'
              : 'text-slate-700 cursor-not-allowed'
          }`}
        >
          ↓
        </button>
      </div>
    </div>
  );
}
