import React, { useEffect, useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function MainIncomeForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [mainIncomeSource, setMainIncomeSource] = useState(formData?.mainIncomeSource || '');
  const [mainIncomeSourceOther, setMainIncomeSourceOther] = useState(formData?.mainIncomeSourceOther || '');

  // Guarde o valor em CENTAVOS (number). Nunca use float.
  const initialCents =
    typeof formData?.mainIncomeAmount === 'number'
      ? formData.mainIncomeAmount
      : Number(String(formData?.mainIncomeAmount || '0').replace(/\D/g, ''));

  const [mainIncomeAmount, setMainIncomeAmount] = useState<number>(initialCents);
  const [displayAmount, setDisplayAmount] = useState<string>('');

  // Helpers locais (jogue fora suas utils bugadas)
  const toCents = (s: string) => {
    const digits = s.replace(/\D/g, '');
    return digits ? Number(digits) : 0;
  };
  const formatBRL = (cents: number) =>
    (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    setDisplayAmount(formatBRL(mainIncomeAmount));
  }, [mainIncomeAmount]);

  const incomeOptions = [
    'Salário fixo (CLT)',
    'Pró-labore / honorários de empresa própria',
    'Prestação de serviços autônomos',
    'Comissões por vendas / resultados',
    'Freelance / trabalhos eventuais',
    'Aposentadoria / pensão',
    'Outros',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mainIncomeSource && mainIncomeAmount > 0 && (mainIncomeSource !== 'Outros' || mainIncomeSourceOther)) {
      onContinue({
        mainIncomeSource,
        mainIncomeSourceOther: mainIncomeSource === 'Outros' ? mainIncomeSourceOther : '',
        // Passe em centavos (número). Se seu backend espera string, serialize aqui.
        mainIncomeAmount,
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
          <h2 className="text-2xl font-bold text-white mb-2">Renda Ativa</h2>
          <p className="text-white/60">
            Vamos mapear suas fontes de renda (principais e adicionais) para compreender seu potencial de poupança e investimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">Fonte de renda principal</label>
            <div className="space-y-3">
              {incomeOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="mainIncomeSource"
                    value={option}
                    checked={mainIncomeSource === option}
                    onChange={(e) => setMainIncomeSource(e.target.value)}
                    className="w-4 h-4 text-accent focus:ring-accent"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {mainIncomeSource === 'Outros' && (
            <div>
              <label className="block text-lg font-medium text-white mb-3">Especifique sua fonte de renda:</label>
              <input
                type="text"
                value={mainIncomeSourceOther}
                onChange={(e) => setMainIncomeSourceOther(e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                placeholder="Digite aqui..."
                required
              />
            </div>
          )}

          {mainIncomeSource && (
            <div>
              <label className="block text-lg font-medium text-white mb-3">Valor da renda principal (mensal):</label>
              <input
                type="text"
                inputMode="numeric"
                value={displayAmount}
                onChange={(e) => {
                  const cents = toCents(e.target.value);
                  setMainIncomeAmount(cents);
                  setDisplayAmount(formatBRL(cents));
                }}
                onBlur={() => setDisplayAmount(formatBRL(mainIncomeAmount))}
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                placeholder="R$ 0,00"
                required
              />
            </div>
          )}

          <div className="pb-16">
            <button
              type="submit"
              disabled={!mainIncomeSource || mainIncomeAmount <= 0 || (mainIncomeSource === 'Outros' && !mainIncomeSourceOther)}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                mainIncomeSource && mainIncomeAmount > 0 && (mainIncomeSource !== 'Outros' || mainIncomeSourceOther)
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
