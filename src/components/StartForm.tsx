import React from 'react';
import { FormStepProps } from '../types/form';
import PageHeader from './PageHeader';
import BackButton from './BackButton';

export default function StartForm({ onContinue, onBack, canGoBack, questionNumber }: FormStepProps) {
  return (
    <>
      <PageHeader />
      <BackButton onClick={() => onBack?.()} show={!!canGoBack} />
      <div className="min-h-screen bg-[#003366] flex flex-col items-center font-inter px-6 pt-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-funnel font-bold text-white mb-4 text-left">
          Diagnóstico Financeiro Pessoal
        </h1>

        <div className="prose prose-invert max-w-none mb-8 text-white/80 leading-relaxed">
          <p className="text-lg mb-4">Olá!</p>
          <p className="mb-4">
            Este questionário é o primeiro passo para que possamos começar a traçar o seu planejamento financeiro personalizado.
            Queremos te ajudar a organizar o fluxo de dinheiro, eliminar eventuais dívidas, investir melhor e alcançar seus objetivos.
          </p>
          <p className="mb-4">Reserve cerca de 10 minutos para responder com calma.</p>
          <p className="font-medium text-white">
            Não há respostas certas ou erradas. O importante é que sejam verdadeiras e completas.
          </p>
        </div>

        <button
          onClick={() => onContinue({})}
          className="w-full max-w-[576px] py-4 bg-[#003366] text-white rounded-full hover:bg-[#003366]/90 transition-colors duration-200 font-medium text-lg shadow-md hover:shadow-lg"
        >
          Iniciar Diagnóstico
        </button>
      </div>
      </div>
    </>
  );
}