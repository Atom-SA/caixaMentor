import React from 'react';
import { FormStepProps } from '../types/form';
import { BookOpen, TrendingUp, Zap, ArrowRight } from 'lucide-react';

const DiagnosisResult: React.FC<FormStepProps> = ({ onContinue, formData }) => {
  const calculateLevel = () => {
    const knowsBalance = formData?.knowsMonthlyBalance;
    const hasEmergency = formData?.hasEmergencyFund;
    const invests = formData?.investsMonthly;

    if (!knowsBalance) {
      return 'fundamentos';
    }

    if (knowsBalance && !hasEmergency && !invests) {
      return 'patrimonio';
    }

    if (knowsBalance && hasEmergency && invests) {
      return 'otimizacao';
    }

    if (knowsBalance && (hasEmergency || invests)) {
      return 'patrimonio';
    }

    return 'fundamentos';
  };

  const level = calculateLevel();

  const levels = {
    fundamentos: {
      icon: BookOpen,
      title: 'Fundamentos',
      subtitle: 'Educação financeira',
      message: 'Você ainda não sabe quanto sobra no mês.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-500',
    },
    patrimonio: {
      icon: TrendingUp,
      title: 'Patrimônio',
      subtitle: 'Construção consistente',
      message: 'Você é estável, mas não constrói com rotina.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
    },
    otimizacao: {
      icon: Zap,
      title: 'Otimização',
      subtitle: 'IA em finanças',
      message: 'A base existe. Falta eficiência.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-500',
    },
  };

  const currentLevel = levels[level];
  const Icon = currentLevel.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className={`inline-flex w-24 h-24 rounded-2xl bg-gradient-to-br ${currentLevel.color} items-center justify-center shadow-lg mb-6`}>
            <Icon className="w-12 h-12 text-white" strokeWidth={2} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Seu Diagnóstico
          </h2>
        </div>

        <div className={`${currentLevel.bgColor} border-2 ${currentLevel.borderColor} rounded-xl p-8 mb-8`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${currentLevel.iconBg} rounded-lg flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {currentLevel.title}
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                {currentLevel.subtitle}
              </p>
            </div>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            {currentLevel.message}
          </p>
        </div>

        <button
          onClick={() => onContinue({ diagnosisLevel: level })}
          className={`w-full bg-gradient-to-r ${currentLevel.color} text-white text-lg font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2`}
        >
          Ver Meu Plano
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
