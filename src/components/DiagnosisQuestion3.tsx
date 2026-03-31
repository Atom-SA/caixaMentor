import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { PiggyBank, WalletCards } from 'lucide-react';

export default function DiagnosisQuestion3({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [answer, setAnswer] = useState<boolean | null>(formData?.investsMonthly ?? null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer !== null) {
      let diagnosisLevel: 'fundamentos' | 'patrimonio' | 'otimizacao';

      if (!formData?.knowsMonthlyBalance) {
        diagnosisLevel = 'fundamentos';
      } else if (!answer) {
        diagnosisLevel = 'patrimonio';
      } else {
        diagnosisLevel = 'otimizacao';
      }

      onContinue({
        investsMonthly: answer,
        diagnosisLevel
      });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-b from-[#003366] via-[#003366] to-[#002244] font-inter px-6 py-8 pt-20 pb-40">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="w-full max-w-2xl mx-auto">
          <QuestionNumber number={questionNumber} />
          <form id="diagnosis-q3-form" onSubmit={handleSubmit}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight animate-fade-in">
              Você guarda ou investe dinheiro todo mês?
            </h2>
            <p className="text-white/50 text-sm mb-8 animate-fade-in-delay-1">
              Qualquer valor separado com regularidade conta
            </p>

            <div className="grid grid-cols-2 gap-4 animate-slide-up-delay-1">
              <button
                type="button"
                onClick={() => setAnswer(true)}
                className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  answer === true
                    ? 'border-[#F2C94C] bg-[#F2C94C]/10 shadow-lg shadow-[#F2C94C]/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  answer === true
                    ? 'bg-[#F2C94C] scale-110'
                    : 'bg-white/10 group-hover:bg-white/15'
                }`}>
                  <PiggyBank className={`w-6 h-6 transition-colors ${
                    answer === true ? 'text-[#003366]' : 'text-white/60'
                  }`} />
                </div>
                <span className={`font-semibold text-lg transition-colors ${
                  answer === true ? 'text-[#F2C94C]' : 'text-white/80'
                }`}>Sim</span>
                <input type="radio" name="investsMonthly" value="true" checked={answer === true} onChange={() => setAnswer(true)} className="sr-only" />
              </button>

              <button
                type="button"
                onClick={() => setAnswer(false)}
                className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  answer === false
                    ? 'border-[#F2C94C] bg-[#F2C94C]/10 shadow-lg shadow-[#F2C94C]/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  answer === false
                    ? 'bg-[#F2C94C] scale-110'
                    : 'bg-white/10 group-hover:bg-white/15'
                }`}>
                  <WalletCards className={`w-6 h-6 transition-colors ${
                    answer === false ? 'text-[#003366]' : 'text-white/60'
                  }`} />
                </div>
                <span className={`font-semibold text-lg transition-colors ${
                  answer === false ? 'text-[#F2C94C]' : 'text-white/80'
                }`}>Não</span>
                <input type="radio" name="investsMonthly" value="false" checked={answer === false} onChange={() => setAnswer(false)} className="sr-only" />
              </button>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-10 bg-gradient-to-t from-[#002244] via-[#002244]/95 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              form="diagnosis-q3-form"
              type="submit"
              disabled={answer === null}
              className={`w-full py-4 rounded-2xl transition-all duration-300 font-semibold text-lg shadow-lg ${
                answer !== null
                  ? 'bg-gradient-to-r from-[#F2C94C] to-[#E5A832] text-[#003366] hover:brightness-110 active:scale-[0.98] shadow-[#F2C94C]/20'
                  : 'bg-white/8 text-white/25 cursor-not-allowed shadow-none'
              }`}
            >
              Ver resultado
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
