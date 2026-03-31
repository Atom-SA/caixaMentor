import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function PassiveIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasPassiveIncome, setHasPassiveIncome] = useState(formData?.hasPassiveIncome || '');
  const [selectedSources, setSelectedSources] = useState<string[]>(formData?.passiveIncomeSources || []);
  const [passiveIncomeValue, setPassiveIncomeValue] = useState<number>(
    typeof formData?.passiveIncomeValue === 'number' ? formData.passiveIncomeValue : 0
  );
  const [displayValue, setDisplayValue] = useState(
    passiveIncomeValue > 0 ? formatCurrencyInput(passiveIncomeValue) : ''
  );

  const incomeOptions = [
    'Aluguéis de imóveis',
    'Investimentos financeiros (renda fixa, dividendos, fundos imobiliários etc.)',
    'Royalties de livros, marcas, patentes ou franquias',
    'Negócio automatizado / online que gera receita recorrente',
    'Participação societária (lucros de empresa em que não atua diretamente)',
    'Outras',
  ];

  const handleCheckboxChange = (option: string) => {
    setSelectedSources((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasPassiveIncome === 'Não') {
      onContinue({
        hasPassiveIncome,
        passiveIncomeSources: [],
        passiveIncomeValue: 0,
      });
      return;
    }

    if (hasPassiveIncome === 'Sim' && selectedSources.length > 0 && passiveIncomeValue > 0) {
      const dataToSend = {
        hasPassiveIncome,
        passiveIncomeSources: selectedSources,
        passiveIncomeValue,
      };
      onContinue(dataToSend);
    }
  };

  const isValid =
    hasPassiveIncome === 'Não' ||
    (hasPassiveIncome === 'Sim' &&
      selectedSources.length > 0 &&
      passiveIncomeValue > 0);

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pergunta principal */}
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Você possui renda passiva (aluguéis, investimentos, royalties etc.)?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasPassiveIncome === option
                      ? 'border-accent bg-blue-50'
                      : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasPassiveIncome"
                    value={option}
                    checked={hasPassiveIncome === option}
                    onChange={(e) => {
                      setHasPassiveIncome(e.target.value);
                      if (e.target.value === 'Não') {
                        setSelectedSources([]);
                        setPassiveIncomeValue(0);
                        setDisplayValue('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="capitalize text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opções se "Sim" */}
          {hasPassiveIncome === 'Sim' && (
            <div className="space-y-4">
              <label className="block text-lg font-medium text-white mb-4">
                Se sim, quais?
              </label>
              <div className="space-y-3">
                {incomeOptions.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSources.includes(option)
                        ? 'border-accent bg-blue-50'
                        : 'border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedSources.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      className="w-4 h-4 text-accent focus:ring-accent"
                    />
                    <span className="ml-3 text-white">{option}</span>
                  </label>
                ))}
              </div>

              {/* Campo de valor formatado */}
              {selectedSources.length > 0 && (
                <div className="mt-4">
                  <label className="block text-lg font-medium text-white mb-2">
                    Valor total aproximado mensal da renda complementar:
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayValue}
                    onChange={(e) => {
                      const newCents = handleCurrencyInput(e.target.value, passiveIncomeValue);
                      setPassiveIncomeValue(newCents);
                      setDisplayValue(formatCurrencyInput(newCents));
                    }}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              )}
            </div>
          )}

          {/* Botão de continuar */}
          <div className="pb-16">
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                isValid
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
