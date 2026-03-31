import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { BookOpen, TrendingUp, Sparkles, Check, Lock, ChevronRight } from 'lucide-react';

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
      description: 'Organize seu mês em 15 minutos e saiba exatamente para onde vai cada real.',
      buttonText: 'Começar agora',
      available: true,
      completed: false,
    },
    {
      number: 2,
      icon: TrendingUp,
      title: 'Construção de patrimônio',
      subtitle: 'Metas e constância',
      description: 'Crie metas realistas e construa hábitos que fazem seu dinheiro crescer.',
      buttonText: 'Em seguida',
      available: false,
      completed: false,
    },
    {
      number: 3,
      icon: Sparkles,
      title: 'Tecnologia aplicada às suas finanças',
      subtitle: 'IA em finanças',
      description: 'Acompanhamento inteligente para otimizar cada decisão financeira.',
      buttonText: 'Em breve',
      available: false,
      completed: false,
    },
  ];

  return (
    <>
      <PageHeader darkBg invertLogo />
      <div className="min-h-screen bg-gradient-to-b from-[#003366] via-[#003366] to-[#002244] font-inter px-4 sm:px-6 py-6 sm:py-8 pt-20 pb-8">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} lightMode />
        <div className="max-w-2xl w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight animate-fade-in">
              Seu Plano de Evolução
            </h1>

            {/* Progress indicator */}
            <div className="inline-flex items-center gap-3 glass-card rounded-full px-5 py-2.5 animate-fade-in-delay-1">
              <span className="text-sm text-white/60">Progresso</span>
              <div className="w-24 sm:w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F2C94C] to-[#E5A832] rounded-full animate-progress-fill"
                  style={{ width: '33%' }}
                />
              </div>
              <span className="text-sm font-semibold text-[#F2C94C]">1/3</span>
            </div>
          </div>

          {/* Steps timeline */}
          <div className="relative space-y-4">
            {/* Timeline vertical line */}
            <div className="absolute left-[27px] sm:left-[31px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-[#F2C94C]/40 via-white/10 to-white/5 z-0" />

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative z-10 animate-slide-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div
                    className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-500 ${
                      step.available
                        ? 'glass-card border-[#F2C94C]/40 shadow-lg shadow-[#F2C94C]/5 animate-glow-pulse'
                        : 'bg-white/[0.03] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Step circle */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-[54px] h-[54px] sm:w-[62px] sm:h-[62px] rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            step.completed
                              ? 'bg-gradient-to-br from-[#F2C94C] to-[#E5A832]'
                              : step.available
                              ? 'bg-gradient-to-br from-[#F2C94C] to-[#E5A832] shadow-md shadow-[#F2C94C]/20'
                              : 'bg-white/8'
                          }`}
                        >
                          {step.completed ? (
                            <Check className="w-7 h-7 text-[#003366]" strokeWidth={3} />
                          ) : step.available ? (
                            <Icon className="w-7 h-7 text-[#003366]" strokeWidth={2} />
                          ) : (
                            <Lock className="w-6 h-6 text-white/30" strokeWidth={2} />
                          )}
                        </div>
                        {/* Step number badge */}
                        <div
                          className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ring-2 ring-[#003366] ${
                            step.completed || step.available
                              ? 'bg-[#F2C94C] text-[#003366]'
                              : 'bg-white/15 text-white/40'
                          }`}
                        >
                          {step.number}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`text-base sm:text-lg font-bold leading-snug ${
                            step.available ? 'text-white' : 'text-white/40'
                          }`}>
                            {step.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 mb-2.5">
                          <p className={`text-xs font-medium ${
                            step.available ? 'text-[#F2C94C]' : 'text-white/30'
                          }`}>
                            {step.subtitle}
                          </p>
                          {step.completed && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F2C94C]/15 text-[#F2C94C] rounded-full text-[10px] font-semibold">
                              <Check size={10} strokeWidth={3} /> Concluído
                            </span>
                          )}
                          {!step.available && !step.completed && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 text-white/30 rounded-full text-[10px] font-semibold">
                              <Lock size={10} /> Bloqueado
                            </span>
                          )}
                        </div>

                        <p className={`text-sm leading-relaxed mb-4 ${
                          step.available ? 'text-white/60' : 'text-white/25'
                        }`}>
                          {step.description}
                        </p>

                        <button
                          disabled={!step.available}
                          onClick={() => {
                            if (step.available && step.number === 1 && onStartCourses) {
                              onStartCourses();
                            }
                          }}
                          className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                            step.available
                              ? 'bg-gradient-to-r from-[#F2C94C] to-[#E5A832] text-[#003366] shadow-md shadow-[#F2C94C]/15 hover:brightness-110 active:scale-[0.97] cursor-pointer'
                              : 'bg-white/5 text-white/20 cursor-not-allowed'
                          }`}
                        >
                          {step.buttonText}
                          {step.available && <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer message */}
          <div className="mt-8 text-center animate-fade-in-delay-3 px-4">
            <p className="text-white/40 text-sm">
              Complete cada etapa para desbloquear a próxima e avançar no seu plano financeiro
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionPlan;
