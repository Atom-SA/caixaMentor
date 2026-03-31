import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  show: boolean;
  lightMode?: boolean;
}

export default function BackButton({ onClick, show, lightMode = false }: BackButtonProps) {
  if (!show) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-5 left-4 p-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-sm transition-all duration-200 z-50 active:scale-95"
      aria-label="Voltar"
    >
      <ChevronLeft className="w-5 h-5 text-white/80" />
    </button>
  );
}
