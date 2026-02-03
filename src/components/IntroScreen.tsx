import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';

export default function IntroScreen({ onContinue, onBack, canGoBack }: FormStepProps) {
  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center font-inter px-6 pt-8">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-funnel font-bold text-slate-900 mb-4 text-left">
            Mentor do seu novo Plano
          </h1>

          <div className="prose prose-slate max-w-none mb-8 text-slate-700 leading-relaxed">
            <p className="text-lg mb-4">
              Responda 3 perguntas com sim ou não e veja seu plano.
            </p>
          </div>

          <button
            onClick={() => onContinue({})}
            className="w-full max-w-[576px] py-4 bg-[#003366] text-white rounded-full hover:bg-[#003366]/90 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg active:scale-95"
          >
            Começar
          </button>
        </div>
      </div>
    </>
  );
}
