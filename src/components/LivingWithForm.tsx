import React, { useState } from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import QuestionNumber from './QuestionNumber';
import BackButton from './BackButton';

export default function LivingWithForm({ onContinue, onBack, canGoBack, formData, questionNumber }: FormStepProps) {
  const [livingWith, setLivingWith] = useState(formData?.livingWith || '');

  const options = [
    'Sozinho',
    'Com cônjuge',
    'Com cônjuge e filho(s)',
    'Com filho(s)',
    'Com pais',
    'Com amigo(s)'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (livingWith) {
      onContinue({ livingWith });
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
            <label className="block text-lg font-medium text-white mb-4">
              Com quem você vive atualmente?
            </label>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="livingWith"
                    value={option}
                    checked={livingWith === option}
                    onChange={(e) => setLivingWith(e.target.value)}
                    className="w-4 h-4 text-[#F2C94C] focus:ring-[#F2C94C]"
                  />
                  <span className="ml-3 text-white">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pb-16">
            <button
              type="submit"
              disabled={!livingWith}
              className={`w-full max-w-[576px] mx-auto text-white py-3 px-6 rounded-full font-medium transition-colors ${
                livingWith
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
