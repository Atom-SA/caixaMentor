import React from 'react';
import { FormStepProps } from '../types/form';
import { Brain } from 'lucide-react';

const IntroScreen: React.FC<FormStepProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-10 h-10 text-white" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-4">
          Mentor do seu Plano
        </h1>

        <p className="text-xl text-center text-slate-600 mb-12">
          Responda 3 perguntas com sim ou não e veja seu plano.
        </p>

        <button
          onClick={() => onContinue({})}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          Começar
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
