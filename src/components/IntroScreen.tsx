import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';
import { Target, Clock, Sparkles } from 'lucide-react';

export default function IntroScreen({ onContinue, onBack, canGoBack }: FormStepProps) {
  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-b from-[#003366] via-[#003366] to-[#002244] flex flex-col items-center font-inter px-6 pt-8 pb-40">
        <div className="w-full max-w-2xl">
          {/* Hero icon */}
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F2C94C] to-[#E5A832] flex items-center justify-center shadow-lg shadow-[#F2C94C]/20">
              <Target className="w-10 h-10 text-[#003366]" strokeWidth={2} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-funnel font-bold text-white mb-3 text-center animate-fade-in">
            Mentor do seu novo Plano
          </h1>

          <p className="text-center text-white/60 text-base mb-10 animate-fade-in-delay-1">
            Descubra seu nível financeiro em menos de 1 minuto
          </p>

          {/* Info cards */}
          <div className="space-y-3 mb-12">
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 animate-slide-up-delay-1">
              <div className="w-10 h-10 rounded-xl bg-[#F2C94C]/15 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">3 perguntas rápidas</p>
                <p className="text-white/50 text-xs">Sim ou não — direto ao ponto</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-4 animate-slide-up-delay-2">
              <div className="w-10 h-10 rounded-xl bg-[#F2C94C]/15 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#F2C94C]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Plano personalizado</p>
                <p className="text-white/50 text-xs">Receba seu caminho de evolução financeira</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed button */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-10 bg-gradient-to-t from-[#002244] via-[#002244]/95 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              onClick={() => onContinue({})}
              className="w-full py-4 bg-gradient-to-r from-[#F2C94C] to-[#E5A832] text-[#003366] font-bold rounded-2xl hover:brightness-110 transition-all duration-200 text-lg shadow-lg shadow-[#F2C94C]/20 active:scale-[0.98]"
            >
              Começar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
