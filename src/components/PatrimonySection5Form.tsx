import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';
import { formatCurrency, parseCurrency } from '../utils/currency';

export default function PatrimonySection5Form({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [hasEmergencyFund, setHasEmergencyFund] = useState(formData?.hasEmergencyFund || '');
  const [emergencyFundMonths, setEmergencyFundMonths] = useState(formData?.emergencyFundMonths || '');
  const [emergencyFundLocation, setEmergencyFundLocation] = useState(formData?.emergencyFundLocation || '');
  const [alreadyInvests, setAlreadyInvests] = useState(formData?.alreadyInvests || '');
  const [investmentTypes, setInvestmentTypes] = useState(formData?.investmentTypes || '');
  const [monthlyInvestment, setMonthlyInvestment] = useState(formData?.monthlyInvestment || '');
  const [displayMonthlyInvestment, setDisplayMonthlyInvestment] = useState(monthlyInvestment ? formatCurrency(monthlyInvestment) : '');
  const [investmentGoal, setInvestmentGoal] = useState(formData?.investmentGoal || '');
  const [retirementIncome, setRetirementIncome] = useState(formData?.retirementIncome || '');
  const [displayRetirementIncome, setDisplayRetirementIncome] = useState(retirementIncome ? formatCurrency(retirementIncome) : '');
  const [hasVehicle, setHasVehicle] = useState(formData?.hasVehicle || '');
  const [vehicleDetails, setVehicleDetails] = useState(formData?.vehicleDetails || '');
  const [hasProperty, setHasProperty] = useState(formData?.hasProperty || '');
  const [propertyDetails, setPropertyDetails] = useState(formData?.propertyDetails || '');
  const [otherAssets, setOtherAssets] = useState(formData?.otherAssets || '');

  const locationOptions = ['Conta corrente', 'Poupança', 'CDB', 'Fundo', 'Outro'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({
      hasEmergencyFund,
      emergencyFundMonths: hasEmergencyFund === 'Sim' ? emergencyFundMonths : '0',
      emergencyFundLocation: hasEmergencyFund === 'Sim' ? emergencyFundLocation : '',
      alreadyInvests,
      investmentTypes: alreadyInvests === 'Sim' ? investmentTypes : '',
      monthlyInvestment: alreadyInvests === 'Sim' ? monthlyInvestment : '0',
      investmentGoal: alreadyInvests === 'Sim' ? investmentGoal : '',
      retirementIncome,
      hasVehicle,
      vehicleDetails: hasVehicle === 'Sim' ? vehicleDetails : '',
      hasProperty,
      propertyDetails: hasProperty === 'Sim' ? propertyDetails : '',
      otherAssets: otherAssets || 'Nenhum'
    });
  };

  const isValid = hasEmergencyFund &&
    (hasEmergencyFund === 'Não' || (emergencyFundMonths && emergencyFundLocation)) &&
    alreadyInvests &&
    (alreadyInvests === 'Não' || (investmentTypes && monthlyInvestment && investmentGoal)) &&
    retirementIncome &&
    hasVehicle &&
    (hasVehicle === 'Não' || vehicleDetails) &&
    hasProperty &&
    (hasProperty === 'Não' || propertyDetails);

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Seção 5 – Patrimônio e Investimentos
          </h2>
          <p className="text-white/60">
            Agora quero entender o quanto você já construiu de segurança financeira e patrimônio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Você possui reserva de emergência?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="radio"
                    name="hasEmergencyFund"
                    value={option}
                    checked={hasEmergencyFund === option}
                    onChange={(e) => setHasEmergencyFund(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasEmergencyFund === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Ela cobre quantos meses do seu custo fixo?
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={emergencyFundMonths}
                  onChange={(e) => setEmergencyFundMonths(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="Ex: 3"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-4">
                  Onde essa reserva está aplicada?
                </label>
                <div className="space-y-3">
                  {locationOptions.map((option) => (
                    <label key={option} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                      <input
                        type="radio"
                        name="emergencyFundLocation"
                        value={option}
                        checked={emergencyFundLocation === option}
                        onChange={(e) => setEmergencyFundLocation(e.target.value)}
                        className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                      />
                      <span className="ml-3 text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Você já investe?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="radio"
                    name="alreadyInvests"
                    value={option}
                    checked={alreadyInvests === option}
                    onChange={(e) => setAlreadyInvests(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {alreadyInvests === 'Sim' && (
            <>
              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Onde investe atualmente? (CDB, fundos, ações, previdência etc.)
                </label>
                <input
                  type="text"
                  value={investmentTypes}
                  onChange={(e) => setInvestmentTypes(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="Ex: CDB, Tesouro Direto, Ações"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Valor médio investido mensalmente
                </label>
                <input
                  type="text"
                  value={displayMonthlyInvestment}
                  onChange={(e) => {
                    const rawValue = parseCurrency(e.target.value);
                    setMonthlyInvestment(rawValue);
                    setDisplayMonthlyInvestment(formatCurrency(rawValue));
                  }}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="R$ 0,00"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-white mb-3">
                  Qual é o principal objetivo dos seus investimentos?
                </label>
                <input
                  type="text"
                  value={investmentGoal}
                  onChange={(e) => setInvestmentGoal(e.target.value)}
                  className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                  placeholder="Ex: aposentadoria, casa, viagem"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Pensando no futuro, quanto precisaria receber de aposentadoria para viver tranquilo(a)?
            </label>
            <input
              type="text"
              value={displayRetirementIncome}
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value);
                setRetirementIncome(rawValue);
                setDisplayRetirementIncome(formatCurrency(rawValue));
              }}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              placeholder="R$ 0,00"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Possui veículo?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="radio"
                    name="hasVehicle"
                    value={option}
                    checked={hasVehicle === option}
                    onChange={(e) => setHasVehicle(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasVehicle === 'Sim' && (
            <div>
              <label className="block text-lg font-medium text-white mb-3">
                Qual modelo e valor estimado atual?
              </label>
              <input
                type="text"
                value={vehicleDetails}
                onChange={(e) => setVehicleDetails(e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                placeholder="Ex: Honda Civic 2018, R$ 80.000"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Possui imóveis?
            </label>
            <div className="space-y-3">
              {['Não', 'Sim'].map((option) => (
                <label key={option} className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="radio"
                    name="hasProperty"
                    value={option}
                    checked={hasProperty === option}
                    onChange={(e) => setHasProperty(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {hasProperty === 'Sim' && (
            <div>
              <label className="block text-lg font-medium text-white mb-3">
                Descreva tipo(s) e valor estimado
              </label>
              <textarea
                value={propertyDetails}
                onChange={(e) => setPropertyDetails(e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
                rows={3}
                placeholder="Ex: Apartamento em São Paulo, R$ 500.000"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-lg font-medium text-white mb-3">
              Tem algum outro bem relevante (empresa, joias, terrenos etc.)?
            </label>
            <input
              type="text"
              value={otherAssets}
              onChange={(e) => setOtherAssets(e.target.value)}
              className="w-full px-4 py-3 border border-white/20 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder:text-white/40"
              placeholder="Digite se houver, ou deixe em branco"
            />
            <p className="mt-2 text-sm text-white/50">Opcional</p>
          </div>

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
