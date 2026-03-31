import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrencyInput, handleCurrencyInput } from '../utils/currency';

export default function PatrimonyRetirementForm({
  onContinue,
  onBack,
  canGoBack,
  formData,
  questionNumber,
}: FormStepProps) {
  const [retirementIncome, setRetirementIncome] = useState<number>(
    typeof formData?.retirementIncome === 'number' ? formData.retirementIncome : 0
  );
  const [displayRetirement, setDisplayRetirement] = useState(
    retirementIncome > 0 ? formatCurrencyInput(retirementIncome) : ''
  );
  const [retirementAge, setRetirementAge] = useState(formData?.retirementAge || '');

  // NOVOS CAMPOS – Seguro de vida
  const [hasLifeInsurance, setHasLifeInsurance] = useState(formData?.hasLifeInsurance || '');
  const [lifeInsuranceCompany, setLifeInsuranceCompany] = useState(formData?.lifeInsuranceCompany || '');
  const [lifeInsurancePremium, setLifeInsurancePremium] = useState<number>(
    typeof formData?.lifeInsurancePremium === 'number' ? formData.lifeInsurancePremium : 0
  );
  const [displayLifeInsurancePremium, setDisplayLifeInsurancePremium] = useState(
    lifeInsurancePremium > 0 ? formatCurrencyInput(lifeInsurancePremium) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (retirementIncome > 0 && retirementAge && hasLifeInsurance) {
      onContinue({
        retirementIncome,
        retirementAge,
        hasLifeInsurance,
        lifeInsuranceCompany: hasLifeInsurance === 'Sim' ? lifeInsuranceCompany : '',
        lifeInsurancePremium:
          hasLifeInsurance === 'Sim' ? lifeInsurancePremium : 0,
      });
    }
  };

  const isValid =
    retirementIncome > 0 &&
    !!retirementAge &&
    !!hasLifeInsurance &&
    (hasLifeInsurance === 'Não' ||
      (lifeInsuranceCompany.trim() !== '' && lifeInsurancePremium > 0));

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <h2 className="text-2xl font-bold text-white mb-2">
          O Longo Prazo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Pensando no futuro, quanto precisaria receber por mês de aposentadoria para viver tranquilo(a)?
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={displayRetirement}
              onChange={(e) => {
                const newCents = handleCurrencyInput(e.target.value, retirementIncome);
                setRetirementIncome(newCents);
                setDisplayRetirement(formatCurrencyInput(newCents));
              }}
              placeholder="Ex: R$ 5.000,00"
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Com quantos anos pretende se aposentar?
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              placeholder="Ex: 65"
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
            />
          </div>

          {/* NOVA PERGUNTA – Seguro de vida */}
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Possui seguro de vida?
            </label>
            <div className="flex gap-4">
              {['Não', 'Sim'].map((opt) => (
                <label
                  key={opt}
                  className={`flex-1 text-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    hasLifeInsurance === opt
                      ? 'border-accent bg-slate-900/10'
                      : 'border-white/20 hover:bg-white/5'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasLifeInsurance"
                    value={opt}
                    checked={hasLifeInsurance === opt}
                    onChange={(e) => {
                      setHasLifeInsurance(e.target.value);
                      if (e.target.value === 'Não') {
                        setLifeInsuranceCompany('');
                        setLifeInsurancePremium(0);
                        setDisplayLifeInsurancePremium('');
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-white">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {hasLifeInsurance === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Qual empresa?
                </label>
                <input
                  type="text"
                  value={lifeInsuranceCompany}
                  onChange={(e) => setLifeInsuranceCompany(e.target.value)}
                  placeholder="Ex: Porto Seguro, Bradesco, Prudential..."
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Qual valor do prêmio mensal (R$)?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={displayLifeInsurancePremium}
                  onChange={(e) => {
                    const newCents = handleCurrencyInput(e.target.value, lifeInsurancePremium);
                    setLifeInsurancePremium(newCents);
                    setDisplayLifeInsurancePremium(formatCurrencyInput(newCents));
                  }}
                  placeholder="R$ 0,00"
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                />
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
