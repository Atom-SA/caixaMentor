import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function IncomeAmountsForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [grossIncome, setGrossIncome] = useState<number>(
    typeof formData?.grossIncome === 'number' ? formData.grossIncome : 0
  );
  const [netIncome, setNetIncome] = useState<number>(
    typeof formData?.netIncome === 'number' ? formData.netIncome : 0
  );
  const [displayGrossIncome, setDisplayGrossIncome] = useState(
    grossIncome > 0 ? formatCurrencyInput(grossIncome) : ''
  );
  const [displayNetIncome, setDisplayNetIncome] = useState(
    netIncome > 0 ? formatCurrencyInput(netIncome) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (grossIncome > 0 && netIncome > 0) {
      onContinue({ grossIncome, netIncome });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="w-full max-w-2xl mx-auto px-4 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="bg-white/10 rounded-lg shadow-sm p-8">
        <QuestionNumber number={questionNumber} />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Renda total bruta (média mensal)
            </label>
            <input
              type="text"
              value={displayGrossIncome}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, grossIncome);
                setGrossIncome(newCents);
                setDisplayGrossIncome(formatCurrencyInput(newCents));
              }}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Renda total líquida (após descontos)
            </label>
            <input
              type="text"
              value={displayNetIncome}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, netIncome);
                setNetIncome(newCents);
                setDisplayNetIncome(formatCurrencyInput(newCents));
              }}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={grossIncome === 0 || netIncome === 0}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                grossIncome > 0 && netIncome > 0
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
