import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function MaritalStatusForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [maritalStatus, setMaritalStatus] = useState(formData?.maritalStatus || '');

  const options = [
    'Solteiro(a)',
    'Casado(a)',
    'União estável',
    'Divorciado(a)',
    'Viúvo(a)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (maritalStatus) {
      onContinue({ maritalStatus });
    }
  };

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-[#003366] font-inter px-6 py-8 pt-20">
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="w-full max-w-2xl mx-auto">
        <QuestionNumber number={questionNumber} />
        <form id="marital-status-form" onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-4">
              Qual seu Estado civil?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={option}
                    checked={maritalStatus === option}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 pb-16 bg-gradient-to-t from-[#003366] to-transparent">
        <div className="w-full max-w-[576px] mx-auto">
          <button
            form="marital-status-form"
            type="submit"
            disabled={!maritalStatus}
            className={`w-full py-4 text-white rounded-full transition-colors duration-200 font-medium text-lg shadow-md ${
              maritalStatus
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
