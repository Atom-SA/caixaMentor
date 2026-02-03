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
      color: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500',
    },
    patrimonio: {
      title: 'Patrimônio',
      subtitle: 'Construção de base',
      message: 'Você é estável, mas não constrói com rotina.',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500',
    },
    otimizacao: {
      title: 'Otimização',
      subtitle: 'IA em finanças',
      message: 'A base existe. Falta eficiência.',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500',
    },
  };

  const currentDiagnosis = diagnoses[level];
  const Icon = currentDiagnosis.icon;

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center">
            <div className={`inline-flex w-24 h-24 rounded-full bg-gradient-to-br ${currentDiagnosis.color} items-center justify-center shadow-lg mb-8`}>
              <Icon className="w-12 h-12 text-white" strokeWidth={2} />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              {currentDiagnosis.title}
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              {currentDiagnosis.subtitle}
            </p>

            <p className="text-2xl text-slate-800 font-medium leading-relaxed mb-16">
              {currentDiagnosis.message}
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({})}
              className="w-full py-4 bg-[#003366] text-white rounded-full hover:bg-[#003366]/90 transition-all duration-200 font-medium text-lg shadow-md hover:shadow-lg active:scale-95"
            >
              Ver meu plano
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
