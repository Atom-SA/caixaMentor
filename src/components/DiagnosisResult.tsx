import React from 'react';
import { FormStepProps } from '../types/form';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Zap, ArrowRight } from 'lucide-react';

export default function DiagnosisResult({ onContinue, onBack, canGoBack, formData }: FormStepProps) {
  const level = formData?.diagnosisLevel || 'fundamentos';

  const diagnoses = {
    fundamentos: {
      title: 'Fundamentos',
      subtitle: 'Educação financeira',
      message: 'Você ainda não sabe quanto sobra no mês. Vamos organizar sua vida financeira do zero.',
      icon: BookOpen,
      gradient: 'from-[#F2C94C]/20 via-transparent to-transparent',
    },
    patrimonio: {
      title: 'Patrimônio',
      subtitle: 'Construção de base',
      message: 'Você é estável, mas não constrói com rotina. Hora de criar consistência.',
      icon: TrendingUp,
      gradient: 'from-[#4ECDC4]/20 via-transparent to-transparent',
    },
    otimizacao: {
      title: 'Otimização',
      subtitle: 'IA em finanças',
      message: 'A base existe. Falta eficiência e tecnologia para potencializar seus resultados.',
      icon: Zap,
      gradient: 'from-[#A78BFA]/20 via-transparent to-transparent',
    },
  };

  const currentDiagnosis = diagnoses[level];
  const Icon = currentDiagnosis.icon;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#003366] via-[#003366] to-[#002244] font-inter px-6 py-8 pt-16 pb-40">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />

        {/* Decorative gradient blob */}
        <div className={`absolute inset-0 bg-gradient-radial ${currentDiagnosis.gradient} pointer-events-none opacity-60`} />

        <div className="w-full max-w-2xl mx-auto relative">
          <div className="flex flex-col items-center text-center">
            {/* Completed badge */}
            <div className="animate-fade-in mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-medium uppercase tracking-wider">
                Diagnóstico completo
              </span>
            </div>

            {/* Main icon with glow */}
            <div className="relative animate-scale-in mb-8">
              <div className="absolute inset-0 w-28 h-28 rounded-3xl bg-[#F2C94C]/20 blur-2xl" />
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-[#F2C94C] to-[#E5A832] flex items-center justify-center shadow-xl shadow-[#F2C94C]/20 animate-glow-pulse">
                <Icon className="w-14 h-14 text-[#003366]" strokeWidth={1.8} />
              </div>
            </div>

            {/* Level label */}
            <p className="text-[#F2C94C] text-sm font-semibold uppercase tracking-widest mb-2 animate-fade-in-delay-1">
              Seu nível
            </p>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight animate-fade-in-delay-1">
              {currentDiagnosis.title}
            </h1>
            <p className="text-lg text-white/50 mb-10 animate-fade-in-delay-2">
              {currentDiagnosis.subtitle}
            </p>

            {/* Message card */}
            <div className="glass-card rounded-2xl p-6 w-full animate-slide-up-delay-2">
              <p className="text-lg text-white/85 leading-relaxed">
                {currentDiagnosis.message}
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-10 bg-gradient-to-t from-[#002244] via-[#002244]/95 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({})}
              className="w-full py-4 bg-gradient-to-r from-[#F2C94C] to-[#E5A832] text-[#003366] rounded-2xl hover:brightness-110 transition-all duration-300 font-bold text-lg shadow-lg shadow-[#F2C94C]/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Ver meu plano
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
