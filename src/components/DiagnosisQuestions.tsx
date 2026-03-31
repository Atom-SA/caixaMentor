import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import { CheckCircle2, XCircle } from 'lucide-react';

const DiagnosisQuestions: React.FC<FormStepProps> = ({ onContinue, formData }) => {
  const [answers, setAnswers] = useState({
    knowsMonthlyBalance: formData?.knowsMonthlyBalance || null,
    hasEmergencyFund: formData?.hasEmergencyFund || null,
    investsMonthly: formData?.investsMonthly || null,
  });

  const questions = [
    {
      id: 'knowsMonthlyBalance',
      text: 'Você sabe quanto sobra no fim do mês?',
    },
    {
      id: 'hasEmergencyFund',
      text: 'Você tem reserva de emergência para 3 meses?',
    },
    {
      id: 'investsMonthly',
      text: 'Você guarda ou investe dinheiro todo mês?',
    },
  ];

  const handleAnswer = (questionId: string, value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const allAnswered = Object.values(answers).every((answer) => answer !== null);

  const handleContinue = () => {
    if (allAnswered) {
      onContinue(answers);
    }
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white/10 rounded-2xl shadow-xl p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Diagnóstico Rápido
          </h2>
          <p className="text-lg text-white/60">
            Responda as 3 perguntas abaixo:
          </p>
        </div>

        <div className="space-y-6 mb-10">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-slate-50 rounded-xl p-6 border-2 border-white/20">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <p className="text-lg font-medium text-white flex-1 pt-1">
                  {question.text}
                </p>
              </div>

              <div className="flex gap-3 ml-11">
                <button
                  onClick={() => handleAnswer(question.id, true)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    answers[question.id as keyof typeof answers] === true
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 border-2 border-white/20 hover:border-green-500 hover:text-green-600'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Sim
                </button>

                <button
                  onClick={() => handleAnswer(question.id, false)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    answers[question.id as keyof typeof answers] === false
                      ? 'bg-red-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 border-2 border-white/20 hover:border-red-500 hover:text-red-400'
                  }`}
                >
                  <XCircle className="w-5 h-5" />
                  Não
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!allAnswered}
          className={`w-full text-lg font-semibold py-4 px-8 rounded-xl transition-all duration-200 ${
            allAnswered
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
              : 'bg-slate-300 text-white/50 cursor-not-allowed'
          }`}
        >
          Ver Diagnóstico
        </button>
      </div>
    </div>
  );
};

export default DiagnosisQuestions;
