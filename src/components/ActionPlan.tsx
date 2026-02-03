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
    },
    {
      number: 2,
      icon: TrendingUp,
      title: 'Construção de patrimônio',
      subtitle: 'Metas e constância',
      description: 'Crie metas e avance com constância.',
      buttonText: 'Em seguida',
      available: false,
    },
    {
      number: 3,
      icon: Sparkles,
      title: 'Tecnologia aplicada às suas finanças',
      subtitle: 'IA em finanças',
      description: 'Acompanhamento inteligente',
      buttonText: 'Em breve',
      available: false,
    },
  ];

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="max-w-3xl w-full mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Seu Plano
            </h1>
            <p className="text-xl text-white/80">
              Siga as etapas na ordem recomendada
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`relative backdrop-blur-sm bg-white/10 rounded-3xl p-8 border transition-all duration-500 animate-slide-up ${
                    step.available
                      ? 'border-[#F2C94C] shadow-2xl hover:shadow-[#F2C94C]/20 hover:border-[#F2C94C]/80'
                      : 'border-white/20'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      step.available
                        ? 'bg-[#F2C94C] animate-pulse-soft'
                        : 'bg-white/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${step.available ? 'text-[#003366]' : 'text-white/50'}`} strokeWidth={2} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className={`text-sm font-medium mb-3 ${step.available ? 'text-[#F2C94C]' : 'text-white/60'}`}>
                        {step.subtitle}
                      </p>
                      <p className="text-lg text-white/80 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <button
                        disabled={!step.available}
                        className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                          step.available
                            ? 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 shadow-lg hover:shadow-[#F2C94C]/30 hover:scale-105 active:scale-95 cursor-pointer'
                            : 'bg-white/10 text-white/40 cursor-not-allowed'
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

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '450ms' }}>
            <p className="text-white/70 text-lg">
              Complete cada etapa para desbloquear a próxima
            </p>
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

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ActionPlan;
