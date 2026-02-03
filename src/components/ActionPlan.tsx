import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Sparkles } from 'lucide-react';

const ActionPlan: React.FC<FormStepProps> = ({ formData, onBack, canGoBack }) => {
  const steps = [
    {
      number: 1,
      icon: BookOpen,
      title: 'Fundamentos do seu dinheiro',
      subtitle: 'Educação financeira',
      description: 'Organize seu mês em 15 minutos.',
      buttonText: 'Começar agora',
      available: true,
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: 2,
      icon: TrendingUp,
      title: 'Construção de patrimônio',
      subtitle: 'Metas e constância',
      description: 'Crie metas e avance com constância.',
      buttonText: 'Em seguida',
      available: false,
      color: 'from-slate-400 to-slate-500',
    },
    {
      number: 3,
      icon: Sparkles,
      title: 'Tecnologia aplicada às suas finanças',
      subtitle: 'IA em finanças',
      description: 'Acompanhamento inteligente',
      buttonText: 'Em breve',
      available: false,
      color: 'from-slate-400 to-slate-500',
    },
  ];

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="max-w-3xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Seu Plano
            </h1>
            <p className="text-xl text-slate-600">
              Siga as etapas na ordem recomendada
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative backdrop-blur-sm bg-white/40 rounded-3xl p-8 border transition-all duration-300 ${
                    step.available
                      ? 'border-slate-200 shadow-lg hover:shadow-xl'
                      : 'border-slate-200/50'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-600 font-medium mb-3">
                        {step.subtitle}
                      </p>
                      <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <button
                        disabled={!step.available}
                        className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                          step.available
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95 cursor-pointer'
                            : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {step.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 text-lg">
              Complete cada etapa para desbloquear a próxima
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionPlan;
