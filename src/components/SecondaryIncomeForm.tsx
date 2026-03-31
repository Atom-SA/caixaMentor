import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function SecondaryIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasSecondaryIncome, setHasSecondaryIncome] = useState(formData?.hasSecondaryIncome || '');
  const [selectedSources, setSelectedSources] = useState<string[]>(formData?.secondaryIncomeSources || []);
  const [otherSegundaryIncomeSource, setotherSegundaryIncomeSource] = useState(formData?.otherSegundaryIncomeSource || '');
  const [secondaryIncomeValue, setSecondaryIncomeValue] = useState<number>(
    typeof formData?.secondaryIncomeValue === 'number' ? formData.secondaryIncomeValue : 0
  );
  const [displayValue, setDisplayValue] = useState(
    secondaryIncomeValue > 0 ? formatCurrencyInput(secondaryIncomeValue) : ''
  );


  const incomeOptions = [
    'Salário fixo (CLT)',
    'Pró-labore / honorários de empresa própria',
    'Prestação de serviços autônomos',
    'Comissões por vendas / resultados',
    'Freelance / trabalhos eventuais',
    'Aposentadoria / pensão',
    'Outros',
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

    if (hasSecondaryIncome === 'Não') {
      onContinue({
        hasSecondaryIncome,
        secondaryIncomeSources: [],
        otherSegundaryIncomeSource: '',
        secondaryIncomeValue: 0,
      });
      return;
    }

    if (
      hasSecondaryIncome === 'Sim' &&
      selectedSources.length > 0 &&
      (!selectedSources.includes('Outros') || otherSegundaryIncomeSource.trim() !== '') &&
      secondaryIncomeValue > 0
    ) {
      const dataToSend = {
        hasSecondaryIncome,
        secondaryIncomeSources: selectedSources,
        otherSegundaryIncomeSource: selectedSources.includes('Outros')
          ? otherSegundaryIncomeSource.trim()
          : '',
        secondaryIncomeValue,
      };
      onContinue(dataToSend);
    }
  };

  const isValid =
    hasSecondaryIncome === 'Não' ||
    (hasSecondaryIncome === 'Sim' &&
      selectedSources.length > 0 &&
      secondaryIncomeValue > 0 &&
      (!selectedSources.includes('Outros') || otherSegundaryIncomeSource.trim() !== ''));

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
              Possui outra fonte de renda ativa?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasSecondaryIncome === option
                      ? 'border-accent bg-blue-50'
                      : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasSecondaryIncome"
                    value={option}
                    checked={hasSecondaryIncome === option}
                    onChange={(e) => {
                      setHasSecondaryIncome(e.target.value);
                      if (e.target.value === 'Não') {
                        setSelectedSources([]);
                        setotherSegundaryIncomeSource('');
                        setSecondaryIncomeValue(0);
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
          {hasSecondaryIncome === 'Sim' && (
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

              {/* Campo "Outros" condicional */}
              {selectedSources.includes('Outros') && (
                <div className="mt-4">
                  <label className="block text-lg font-medium text-white mb-2">
                    Especifique:
                  </label>
                  <input
                    type="text"
                    value={otherSegundaryIncomeSource}
                    onChange={(e) => setotherSegundaryIncomeSource(e.target.value)}
                    placeholder="Descreva sua outra fonte de renda"
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              )}

              {/* Campo de valor */}
              <div className="mt-4">
  <label className="block text-lg font-medium text-white mb-2">
    Valor mensal aproximado dessa renda
  </label>
  <input
    type="text"
    inputMode="numeric"
    value={displayValue}
    onChange={(e) => {
      const newCents = handleCurrencyInput(e.target.value, secondaryIncomeValue);
      setSecondaryIncomeValue(newCents);
      setDisplayValue(formatCurrencyInput(newCents));
    }}
    placeholder="Ex: R$ 1.500,00"
    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
  />
</div>

            </div>
          )}

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
