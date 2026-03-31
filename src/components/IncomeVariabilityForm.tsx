import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function IncomeVariabilityForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [incomeVariability, setIncomeVariability] = useState(formData?.incomeVariability || '');
  const [incomeVariabilityDetails, setIncomeVariabilityDetails] = useState(formData?.incomeVariabilityDetails || '');

  const options = [
    'Não',
    'Sim, varia pouco',
    'Sim, varia muito'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (incomeVariability === 'Não') {
      onContinue({ incomeVariability, incomeVariabilityDetails: '' });
    } else if (incomeVariability && incomeVariabilityDetails) {
      onContinue({ incomeVariability, incomeVariabilityDetails });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Sua renda costuma variar?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="incomeVariability"
                    value={option}
                    checked={incomeVariability === option}
                    onChange={(e) => setIncomeVariability(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {incomeVariability !== 'Não' && incomeVariability && (
            <div>
              <label className="block text-lg font-medium text-white mb-3">
                Explique o motivo e a média dessa variação
              </label>
              <textarea
                value={incomeVariabilityDetails}
                onChange={(e) => setIncomeVariabilityDetails(e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                rows={4}
                placeholder="Ex: Trabalho com comissões que variam entre R$ 2.000 e R$ 5.000"
                required
              />
            </div>
          )}

          <div className="pb-16">
            <button
              type="submit"
              disabled={!incomeVariability || (incomeVariability !== 'Não' && !incomeVariabilityDetails)}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                incomeVariability && (incomeVariability === 'Não' || incomeVariabilityDetails)
                  ? 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 cursor-pointer'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
