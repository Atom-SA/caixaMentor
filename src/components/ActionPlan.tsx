import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const ActionPlan: React.FC<FormStepProps> = ({ formData, onBack, canGoBack }) => {
  const level = formData?.diagnosisLevel || 'fundamentos';

  const levels = {
    fundamentos: {
      icon: BookOpen,
      color: 'from-amber-500 to-orange-500',
      iconBg: 'bg-amber-500',
    },
    patrimonio: {
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500',
    },
    otimizacao: {
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500',
    },
  };

  const currentLevel = levels[level];
  const Icon = currentLevel.icon;

  const steps = [
    {
      number: 1,
      title: 'Fundamentos do seu dinheiro',
      subtitle: 'Educação financeira',
      description: 'Organize seu mês em 15 minutos.',
      action: 'Começar agora',
      highlighted: true,
    },
    {
      number: 2,
      title: 'Construa seu patrimônio',
      subtitle: 'Investimentos e proteção',
      description: 'Monte sua reserva e invista com segurança.',
      action: 'Em breve',
      highlighted: false,
    },
    {
      number: 3,
      title: 'Otimize com inteligência',
      subtitle: 'Automação e crescimento',
      description: 'Use IA para maximizar resultados.',
      action: 'Em breve',
      highlighted: false,
    },
  ];

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="max-w-4xl w-full mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-10">
          <div className={`inline-flex w-20 h-20 rounded-2xl bg-gradient-to-br ${currentLevel.color} items-center justify-center shadow-lg mb-6`}>
            <Icon className="w-10 h-10 text-white" strokeWidth={2} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Seu Plano Personalizado
          </h2>
          <p className="text-lg text-slate-600">
            Siga as etapas abaixo na ordem recomendada
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative rounded-xl border-2 transition-all duration-200 ${
                step.highlighted
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300 shadow-lg'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              {step.highlighted && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Disponível
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${
                    step.highlighted ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-slate-400'
                  }`}>
                    {step.number}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium mb-2">
                      {step.subtitle}
                    </p>
                    <p className="text-base text-slate-700 mb-4">
                      {step.description}
                    </p>

                    <button
                      disabled={!step.highlighted}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        step.highlighted
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:scale-105'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {step.action}
                      {step.highlighted && <ArrowRight className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-slate-300">
          <p className="text-center text-slate-700 font-medium">
            Complete cada etapa para desbloquear a próxima e construir um futuro financeiro sólido.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default ActionPlan;
