import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function OtherIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [otherIncome, setOtherIncome] = useState(formData?.otherIncome || '');
  const [otherIncomeValue, setOtherIncomeValue] = useState<number>(
    typeof formData?.otherIncomeValue === 'number' ? formData.otherIncomeValue : 0
  );
  const [displayValue, setDisplayValue] = useState(
    otherIncomeValue > 0 ? formatCurrencyInput(otherIncomeValue) : ''
  );

  const options = [
    'Sim, recebo pensão ou ajuda financeira regular',
    'Sim, recebo bolsas, benefícios ou auxílios (ex: bolsa de estudo, auxílio governamental)',
    'Sim, recebo mesada ou apoio familiar eventual',
    'Não possuo outra fonte de renda',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasOtherIncome = otherIncome.startsWith('Sim');

    if (otherIncome === 'Não possuo outra fonte de renda') {
      onContinue({ otherIncome, otherIncomeValue: 0 });
      return;
    }

    if (hasOtherIncome && otherIncomeValue > 0) {
      onContinue({ otherIncome, otherIncomeValue });
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
              Você possui algum outro tipo de renda complementar?<br />
              <span className="text-white/60 text-base">
                (ex: pensão, mesada, ajuda familiar, bolsas, benefícios, etc.)
              </span>
            </label>

            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    otherIncome === option
                      ? 'border-accent bg-blue-50'
                      : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="otherIncome"
                    value={option}
                    checked={otherIncome === option}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {otherIncome.startsWith('Sim') && (
            <div className="mt-4">
              <label className="block text-lg font-medium text-white mb-2">
                Valor total aproximado mensal da renda complementar:
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={displayValue}
                onChange={(e) => {
                  const newCents = handleCurrencyInput(e.target.value, otherIncomeValue);
                  setOtherIncomeValue(newCents);
                  setDisplayValue(formatCurrencyInput(newCents));
                }}
                placeholder="R$ 0,00"
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                required
              />
            </div>
          )}

          <div className="pb-16">
            <button
              type="submit"
              disabled={
                !otherIncome ||
                (otherIncome.startsWith('Sim') && otherIncomeValue === 0)
              }
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                otherIncome && (!otherIncome.startsWith('Sim') || otherIncomeValue > 0)
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
