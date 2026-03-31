import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';

export default function PhoneForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [phone, setPhone] = useState(formData.phone || '');
  const [error, setError] = useState('');

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const isValid = phone.trim() && validatePhone(phone.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneVal = phone.trim();
    if (!phoneVal) {
      setError('Por favor, digite seu número de contato');
      return;
    }
    if (!validatePhone(phoneVal)) {
      setError('Por favor, digite um número válido com DDD (11 dígitos)');
      return;
    }

    onContinue({ phone: phoneVal });
  };

  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <div className="w-full max-w-2xl mx-auto">
          {questionNumber && (
            <div className="text-sm font-medium text-white/50 mb-2">
              Pergunta {questionNumber}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-funnel font-bold text-white mb-6">
            Qual é o seu número de contato?
          </h1>

          <form id="phone-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-white mb-3">
                Digite seu número com DDD:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setPhone(formatted);
                  if (error) setError('');
                }}
                className="w-full px-4 py-3 border-2 border-white/20 rounded-lg focus:border-[#F2C94C] focus:outline-none transition-colors text-lg bg-white/10 text-white placeholder:text-white/40"
                placeholder="(11) 99999-9999"
                autoComplete="tel"
                inputMode="tel"
                maxLength={15}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

          </form>
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-[#003366] to-transparent">
          <div className="w-full max-w-[576px] mx-auto">
            <button
              type="submit"
              form="phone-form"
              disabled={!isValid}
              className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
                isValid
                  ? 'bg-[#F2C94C] text-[#003366] hover:bg-[#F2C94C]/90 hover:shadow-lg cursor-pointer'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
