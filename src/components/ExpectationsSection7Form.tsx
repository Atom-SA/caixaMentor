import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function ExpectationsSection7Form({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [consultingGoals, setConsultingGoals] = useState<string[]>(formData?.consultingGoals || []);
  const [successDefinition, setSuccessDefinition] = useState(formData?.successDefinition || '');

  const goalOptions = [
    'Organização',
    'Redução de dívidas',
    'Investimentos',
    'Crescimento patrimonial',
    'Outros'
  ];

  const handleGoalToggle = (option: string) => {
    setConsultingGoals(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultingGoals.length > 0 && successDefinition) {
      onContinue({
        consultingGoals,
        successDefinition
      });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Seção 7 – Expectativas e Engajamento
          </h2>
          <p className="text-white/60">
            Por fim, quero entender suas expectativas sobre o acompanhamento financeiro e o que seria um resultado de sucesso pra você.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              O que você busca com esse acompanhamento financeiro?
            </label>
            <div className="space-y-3">
              {goalOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={consultingGoals.includes(option)}
                    onChange={() => handleGoalToggle(option)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C] rounded"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-3">
              O que te faria considerar essa consultoria um sucesso?
            </label>
            <textarea
              value={successDefinition}
              onChange={(e) => setSuccessDefinition(e.target.value)}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              rows={5}
              placeholder="Descreva o que seria um resultado bem-sucedido para você..."
              required
            />
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={consultingGoals.length === 0 || !successDefinition}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                consultingGoals.length > 0 && successDefinition
                  ? 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 cursor-pointer'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Finalizar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
