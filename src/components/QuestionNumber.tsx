import React from 'react';

interface QuestionNumberProps {
  number?: number;
  total?: number;
}

export default function QuestionNumber({ number, total = 3 }: QuestionNumberProps) {
  if (!number) return null;

  return (
    <div className="mb-6 animate-fade-in">
      {/* Step dots */}
      <div className="flex items-center gap-2 mb-3">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const isActive = step === number;
          const isCompleted = step < number;
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'w-8 bg-[#F2C94C]'
                    : isCompleted
                    ? 'w-6 bg-[#F2C94C]/60'
                    : 'w-6 bg-white/15'
                }`}
              />
            </div>
          );
        })}
      </div>
      <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
        Pergunta {number} de {total}
      </p>
    </div>
  );
}
