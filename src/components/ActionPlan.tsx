import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Sparkles, Check, Lock } from 'lucide-react';

interface ActionPlanProps extends FormStepProps {
  onStartCourses?: () => void;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ formData, onBack, canGoBack, onStartCourses }) => {
  const steps = [
    {
      number: 1,
      icon: BookOpen,
      title: 'Fundamentos do seu dinheiro',
      subtitle: 'Educação financeira',
      description: 'Organize seu mês em 15 minutos.',
      buttonText: 'Começar agora',
      available: true,
      completed: false,
    },
    {
      number: 2,
      icon: TrendingUp,
      title: 'Construção de patrimônio',
      subtitle: 'Metas e constância',
      description: 'Crie metas e avance com constância.',
      buttonText: 'Em seguida',
      available: false,
      completed: false,
    },
    {
      number: 3,
      icon: Sparkles,
      title: 'Tecnologia aplicada às suas finanças',
      subtitle: 'IA em finanças',
      description: 'Acompanhamento inteligente',
      buttonText: 'Em breve',
      available: false,
      completed: false,
    },
  ];

  return (
    <>
      <PageHeader darkBg invertLogo />
      <div className="min-h-screen bg-[#003366] font-inter px-4 sm:px-6 py-6 sm:py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} lightMode />
        <div className="max-w-4xl w-full mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Seu Plano de Evolução
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6">
              Progresso: Etapa 1 de 3
            </p>
            <div className="max-w-sm sm:max-w-md mx-auto bg-white/10 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F2C94C] to-[#E5BD43] rounded-full transition-all duration-1000 ease-out"
                style={{ width: '33%' }}
              />
            </div>
          </div>

          <div className="relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="relative pb-8 sm:pb-12">
                  {!isLast && (
                    <div className="hidden sm:block absolute left-7 md:left-8 top-20 bottom-0 w-0.5 sm:w-1 bg-white/20"
                         style={{
                           background: step.completed
                             ? 'linear-gradient(180deg, #F2C94C 0%, rgba(242, 201, 76, 0.3) 100%)'
                             : 'rgba(255, 255, 255, 0.2)'
                         }}
                    />
                  )}

                  <div
                    className={`relative backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border transition-all duration-500 animate-slide-up ${
                      step.available
                        ? 'border-[#F2C94C] shadow-2xl hover:shadow-[#F2C94C]/20 hover:border-[#F2C94C]/80'
                        : 'border-white/20'
                    }`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="relative flex-shrink-0">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                          step.completed
                            ? 'bg-[#F2C94C]'
                            : step.available
                            ? 'bg-[#F2C94C] animate-pulse-soft'
                            : 'bg-white/20'
                        }`}>
                          {step.completed ? (
                            <Check className="w-7 h-7 sm:w-8 sm:h-8 text-[#003366]" strokeWidth={3} />
                          ) : step.available ? (
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#003366]" strokeWidth={2} />
                          ) : (
                            <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white/50" strokeWidth={2} />
                          )}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                          step.completed || step.available
                            ? 'bg-[#003366] text-[#F2C94C]'
                            : 'bg-white/20 text-white/50'
                        }`}>
                          {step.number}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="space-y-2 mb-3 sm:mb-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                              {step.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`text-xs sm:text-sm font-medium ${step.available ? 'text-[#F2C94C]' : 'text-white/60'}`}>
                              {step.subtitle}
                            </p>
                            {step.completed && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F2C94C]/20 text-[#F2C94C] rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                <Check size={12} strokeWidth={3} />
                                Concluído
                              </div>
                            )}
                            {!step.available && !step.completed && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-white/50 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                                <Lock size={12} />
                                Bloqueado
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        <button
                          disabled={!step.available}
                          onClick={() => {
                            if (step.available && step.number === 1 && onStartCourses) {
                              onStartCourses();
                            }
                          }}
                          className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
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
                </div>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 text-center animate-fade-in px-4" style={{ animationDelay: '450ms' }}>
            <p className="text-white/70 text-sm sm:text-base">
              Complete cada etapa para desbloquear a próxima e avançar no seu plano financeiro
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
