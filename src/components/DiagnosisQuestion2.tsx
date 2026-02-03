import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function DiagnosisQuestion2({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [answer, setAnswer] = useState<boolean | null>(formData?.hasEmergencyFund ?? null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer !== null) {
      onContinue({ hasEmergencyFund: answer });
    }
  };

  const handleAnswerClick = (value: boolean) => {
    setAnswer(value);
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-inter px-6 py-8 pt-20">
        <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
        <div className="w-full max-w-2xl mx-auto">
          <QuestionNumber number={questionNumber} />
          <form id="diagnosis-q2-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Você tem reserva de emergência para 3 meses?
              </label>
              <div className="space-y-3">
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    answer === true ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handleAnswerClick(true)}
                >
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    value="true"
                    checked={answer === true}
                    onChange={() => setAnswer(true)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3 text-gray-900">Sim</span>
                </label>
                <label
                  className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    answer === false ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handleAnswerClick(false)}
                >
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    value="false"
                    checked={answer === false}
                    onChange={() => setAnswer(false)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-600"
                  />
                  <span className="ml-3 text-gray-900">Não</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-slate-50 to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              form="diagnosis-q2-form"
              type="submit"
              disabled={answer === null}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
                answer !== null
                  ? 'bg-[#003366] hover:bg-[#003366]/90 hover:shadow-lg cursor-pointer active:scale-95'
                  : 'bg-black cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
