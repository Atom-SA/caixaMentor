import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function DebtsForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasDebts, setHasDebts] = useState(formData?.hasDebts || '');
  const [debtTypes, setDebtTypes] = useState<string[]>(formData?.debtTypes || []);
  const [totalDebtAmount, setTotalDebtAmount] = useState<number>(
    typeof formData?.totalDebtAmount === 'number' ? formData.totalDebtAmount : 0
  );
  const [displayDebtAmount, setDisplayDebtAmount] = useState(
    totalDebtAmount > 0 ? formatCurrencyInput(totalDebtAmount) : ''
  );
  const [averageInterestRate, setAverageInterestRate] = useState(formData?.averageInterestRate || '');
  const [hasOverdueDebts, setHasOverdueDebts] = useState(formData?.hasOverdueDebts || '');
  const [triedRenegotiation, setTriedRenegotiation] = useState(formData?.triedRenegotiation || '');

  const debtTypeOptions = [
    'Cartão de crédito',
    'Empréstimo pessoal',
    'Financiamento imobiliário',
    'Financiamento de veículo',
    'Cheque especial',
    'Outros'
  ];

  const renegotiationOptions = ['Sim', 'Não', 'Em andamento'];

  const handleDebtTypeToggle = (option: string) => {
    setDebtTypes(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasDebts === 'Não') {
      onContinue({ hasDebts });
    } else if (hasDebts === 'Sim' && debtTypes.length > 0 && totalDebtAmount > 0 && hasOverdueDebts && triedRenegotiation) {
      onContinue({
        hasDebts,
        debtTypes,
        totalDebtAmount,
        averageInterestRate: averageInterestRate || 'Não sei',
        hasOverdueDebts,
        triedRenegotiation
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
            Dívidas e Compromissos Financeiros
          </h2>
          <p className="text-white/60">
            Essa parte ajuda a mapear compromissos e possíveis endividamentos — informação essencial para planejar sua recuperação financeira.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Você possui dívidas atualmente?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="hasDebts"
                    value={option}
                    checked={hasDebts === option}
                    onChange={(e) => setHasDebts(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasDebts === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Quais tipos de dívidas possui?
                </label>
                <div className="space-y-3">
                  {debtTypeOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={debtTypes.includes(option)}
                        onChange={() => handleDebtTypeToggle(option)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C] rounded"
                      />
                      <span className="ml-3 text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Valor total aproximado das dívidas
                </label>
                <input
                  type="text"
                  value={displayDebtAmount}
                  onChange={(e) => {
                    const newCents = handleCurrencyInput(e.target.value, totalDebtAmount);
                    setTotalDebtAmount(newCents);
                    setDisplayDebtAmount(formatCurrencyInput(newCents));
                  }}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Taxas de juros médias (se souber)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={averageInterestRate}
                    onChange={(e) => setAverageInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                    placeholder="Ex: 3% ao mês"
                  />
                  <span className="absolute right-4 top-3 text-gray-400">%</span>
                </div>
                <p className="mt-2 text-sm text-white/50">Opcional</p>
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Há algum atraso ou pendência em aberto?
                </label>
                <div className="space-y-3">
                  {['Não', 'Sim'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <input
                        type="radio"
                        name="hasOverdueDebts"
                        value={option}
                        checked={hasOverdueDebts === option}
                        onChange={(e) => setHasOverdueDebts(e.target.value)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                      />
                      <span className="ml-3 text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Já tentou renegociar ou consolidar suas dívidas?
                </label>
                <div className="space-y-3">
                  {renegotiationOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <input
                        type="radio"
                        name="triedRenegotiation"
                        value={option}
                        checked={triedRenegotiation === option}
                        onChange={(e) => setTriedRenegotiation(e.target.value)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                      />
                      <span className="ml-3 text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="pb-16">
            <button
              type="submit"
              disabled={!hasDebts || (hasDebts === 'Sim' && (debtTypes.length === 0 || totalDebtAmount === 0 || !hasOverdueDebts || !triedRenegotiation))}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                hasDebts && (hasDebts === 'Não' || (debtTypes.length > 0 && totalDebtAmount > 0 && hasOverdueDebts && triedRenegotiation))
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
