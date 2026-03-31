import React from 'react';

interface QuestionNumberProps {
  number?: number;
}

export default function QuestionNumber({ number }: QuestionNumberProps) {
  if (!number) return null;

  return (
    <div className="text-sm font-medium text-white/50 mb-2">
      Pergunta {number}
    </div>
  );
}
