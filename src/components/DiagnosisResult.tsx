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
          <div className="text-center mb-8">
            <div className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${currentDiagnosis.color} items-center justify-center shadow-lg mb-6`}>
              <Icon className="w-10 h-10 text-white" strokeWidth={2} />
            </div>

            <h1 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-2">
              {currentDiagnosis.title}
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              {currentDiagnosis.subtitle}
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
              <p className="text-xl text-slate-800 font-medium">
                {currentDiagnosis.message}
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({})}
              className="w-full py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
            >
              Ver meu plano
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
