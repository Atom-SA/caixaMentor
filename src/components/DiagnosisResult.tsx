import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Zap } from 'lucide-react';

export default function DiagnosisResult({ onContinue, onBack, canGoBack, formData }: FormStepProps) {
  const level = formData?.diagnosisLevel || 'fundamentos';

  const diagnoses = {
    fundamentos: {
      title: 'Fundamentos',
      subtitle: 'Educação financeira',
      message: 'Você ainda não sabe quanto sobra no mês.',
      icon: BookOpen,
    },
    patrimonio: {
      title: 'Patrimônio',
      subtitle: 'Construção de base',
      message: 'Você é estável, mas não constrói com rotina.',
      icon: TrendingUp,
    },
    otimizacao: {
      title: 'Otimização',
      subtitle: 'IA em finanças',
      message: 'A base existe. Falta eficiência.',
      icon: Zap,
    },
  };

  const currentDiagnosis = diagnoses[level];
  const Icon = currentDiagnosis.icon;

  return (
    <>
      <PageHeader transparent invertLogo />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex w-24 h-24 rounded-full bg-[#F2C94C] items-center justify-center shadow-lg mb-8 animate-pulse-soft">
              <Icon className="w-12 h-12 text-[#003366]" strokeWidth={2} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {currentDiagnosis.title}
            </h1>
            <p className="text-xl text-[#F2C94C] mb-8 font-medium">
              {currentDiagnosis.subtitle}
            </p>

            <p className="text-2xl text-white/90 font-medium leading-relaxed mb-16">
              {currentDiagnosis.message}
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-[#003366] to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({})}
              className="w-full py-4 bg-[#F2C94C] text-[#003366] rounded-full hover:bg-[#F2C94C]/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-[#F2C94C]/30 hover:scale-105 active:scale-95"
            >
              Ver meu plano
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
