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
      className="fixed top-6 left-6 p-2 hover:opacity-60 transition-opacity duration-200 z-50"
      aria-label="Voltar"
    >
      <ChevronLeft className={`w-7 h-7 ${lightMode ? 'text-white' : 'text-slate-900'}`} />
    </button>
  );
}
