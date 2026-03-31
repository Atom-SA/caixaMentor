import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

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

  const handleAnswerClick = (value: boolean) => {
    setAnswer(value);
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="w-full max-w-2xl mx-auto">
          <QuestionNumber number={questionNumber} />
          <form id="diagnosis-q3-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-white mb-4">
                Você guarda ou investe dinheiro todo mês?
              </label>
              <div className="space-y-3">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                    answer === true ? 'border-[#F2C94C] bg-[#F2C94C]/10' : 'border-white/20'
                  }`}
                  onClick={() => handleAnswerClick(true)}
                >
                  <input
                    type="radio"
                    name="investsMonthly"
                    value="true"
                    checked={answer === true}
                    onChange={() => setAnswer(true)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">Sim</span>
                </label>
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                    answer === false ? 'border-[#F2C94C] bg-[#F2C94C]/10' : 'border-white/20'
                  }`}
                  onClick={() => handleAnswerClick(false)}
                >
                  <input
                    type="radio"
                    name="investsMonthly"
                    value="false"
                    checked={answer === false}
                    onChange={() => setAnswer(false)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">Não</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-[#003366] to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              form="diagnosis-q3-form"
              type="submit"
              disabled={answer === null}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
                answer !== null
                  ? 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 hover:shadow-lg cursor-pointer active:scale-95'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
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
