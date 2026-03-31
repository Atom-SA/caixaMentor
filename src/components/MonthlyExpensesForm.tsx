import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function MonthlyExpensesForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(
    typeof formData?.monthlyExpenses === 'number' ? formData.monthlyExpenses : 0
  );
  const [displayExpenses, setDisplayExpenses] = useState(
    monthlyExpenses > 0 ? formatCurrencyInput(monthlyExpenses) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monthlyExpenses > 0) {
      onContinue({ monthlyExpenses });
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
            <label className="block text-lg font-medium text-white mb-3">
              Quanto gasta em média por mês (total)?
            </label>
            <input
              type="text"
              value={displayExpenses}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, monthlyExpenses);
                setMonthlyExpenses(newCents);
                setDisplayExpenses(formatCurrencyInput(newCents));
              }}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={monthlyExpenses === 0}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                monthlyExpenses > 0
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
