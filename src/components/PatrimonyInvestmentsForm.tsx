import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, parseCurrency, formatCurrency  } from '../utils/currency';

export default function PatrimonyInvestmentsForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [alreadyInvests, setAlreadyInvests] = useState(formData?.alreadyInvests || '');
  const [investmentTypes, setInvestmentTypes] = useState<string[]>(formData?.investmentTypes || []);
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(formData?.monthlyInvestment || 0);
const [displayMonthlyInvestment, setDisplayMonthlyInvestment] = useState(
  formData?.monthlyInvestment ? formatCurrencyInput(formData.monthlyInvestment) : ''
);

  const [totalInvested, setTotalInvested] = useState<number>(formData?.totalInvested || 0);
  const [displayTotalInvested, setDisplayTotalInvested] = useState(
    formData?.totalInvested ? formatCurrencyInput(formData.totalInvested) : ''
  );

  const [investmentGoal, setInvestmentGoal] = useState(formData?.investmentGoal || '');

  const investmentOptions = [
    'CDB / Renda Fixa',
    'Fundos de investimento',
    'Tesouro Direto',
    'Ações',
    'Fundos Imobiliários (FIIs)',
    'Previdência privada',
    'Criptomoedas',
    'Outros',
  ];

  const goalOptions = [
    'Aposentadoria / independência financeira',
    'Compra de imóvel',
    'Viagens e experiências',
    'Formação / educação própria ou dos filhos',
    'Aumentar patrimônio / renda passiva',
    'Outro',
  ];

  const handleCheckboxChange = (opt: string) => {
    setInvestmentTypes((prev) =>
      prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (alreadyInvests === 'Não') {
      onContinue({ alreadyInvests, investmentTypes: [], monthlyInvestment: '', totalInvested: '', investmentGoal: '' });
      return;
    }

    if (alreadyInvests === 'Sim' && investmentTypes.length > 0 && monthlyInvestment && totalInvested && investmentGoal) {
      onContinue({
        alreadyInvests,
        investmentTypes,
        monthlyInvestment,
        totalInvested,
        investmentGoal
      });
    }
  };

  const isValid =
    alreadyInvests === 'Não' ||
    (alreadyInvests === 'Sim' && investmentTypes.length > 0 && monthlyInvestment && totalInvested && investmentGoal);

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-white mb-2">
          Investimentos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 23. Você já investe? */}
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Você já investe?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((option) => (
                <label
                  key={option}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    alreadyInvests === option
                      ? 'border-accent bg-slate-900/10'
                      : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="alreadyInvests"
                    value={option}
                    checked={alreadyInvests === option}
                    onChange={(e) => {
                      setAlreadyInvests(e.target.value);
                      if (e.target.value === 'Não') {
                        setInvestmentTypes([]);
                        setMonthlyInvestment(0);
                        setDisplayMonthlyInvestment('');
                        setTotalInvested(0);
                        setDisplayTotalInvested('');
                        setInvestmentGoal('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="capitalize text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-seção se Sim */}
          {alreadyInvests === 'Sim' && (
            <>
              {/* Onde investe */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Onde investe atualmente?
                </label>
                <div className="space-y-3">
                  {investmentOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        investmentTypes.includes(opt)
                          ? 'border-accent bg-slate-900/10'
                          : 'border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={opt}
                        checked={investmentTypes.includes(opt)}
                        onChange={() => handleCheckboxChange(opt)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                      />
                      <span className="ml-3 text-white">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Valor médio mensal */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Valor médio investido mensalmente
                </label>
                <input
                  type="text"
                  value={displayMonthlyInvestment}
                  onChange={(e) => {
  const cents = parseCurrency(e.target.value);
  setMonthlyInvestment(cents);
  setDisplayMonthlyInvestment(formatCurrencyInput(cents));
}}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="Ex: R$ 500,00"
                />
              </div>

              {/* Quanto tem investido */}
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Quanto você tem investido?
                </label>
                <input
                  type="text"
                  value={displayTotalInvested}
                  onChange={(e) => {
  const cents = parseCurrency(e.target.value);
  setTotalInvested(cents);
  setDisplayTotalInvested(formatCurrencyInput(cents));
}}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="Ex: R$ 10.000,00"
                />
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Qual é o principal objetivo dos seus investimentos?
                </label>
                <div className="space-y-3">
                  {goalOptions.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        investmentGoal === opt
                          ? 'border-accent bg-slate-900/10'
                          : 'border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="radio"
                        name="investmentGoal"
                        value={opt}
                        checked={investmentGoal === opt}
                        onChange={(e) => setInvestmentGoal(e.target.value)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                      />
                      <span className="ml-3 text-white">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
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
