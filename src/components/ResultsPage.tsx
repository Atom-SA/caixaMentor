import React from 'react';
import Logo from './Logo';
import { FormData } from '../types/form';
import { Check } from 'lucide-react';

interface ResultsPageProps {
  formData: FormData;
  onBack: () => void;
  finalPrice?: string;
}

export default function ResultsPage({ formData, finalPrice }: ResultsPageProps) {
  const handleComprar = () => {
    window.location.href = '#';
  };

  return (
    <div className="min-h-screen bg-[#003366] font-inter">
      <div className="fixed top-0 left-0 right-0 bg-[#003366] z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Logo invert height="h-5" brightness="10" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 pt-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Content */}
          <div className="space-y-8 pt-8 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-[#F2C94C]/20 text-[#F2C94C] animate-pulse-soft">
                  <Check size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                  Questionário<br />Concluído!
                </h1>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-lg text-white/90 leading-relaxed">
                Obrigada por dedicar esse tempo a olhar para suas finanças com atenção e cuidado.
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                Suas respostas serão guia para a estruturação de um plano personalizado, feito para trazer clareza, equilíbrio e evolução financeira.
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                Em breve seu consultor entrará em contato para conversarem sobre os próximos passos.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#F2C94C]/20 text-[#F2C94C] rounded-xl font-medium text-sm border border-[#F2C94C]/30">
                <Check size={18} strokeWidth={2.5} />
                Respostas enviadas com sucesso
              </div>
            </div>
          </div>

          {/* Right Section - Consultoria */}
          {finalPrice && (
            <div className="lg:pt-8 animate-fade-in">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#F2C94C]/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-300" />
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-white/10">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Consultoria Personalizada
                    </h2>
                    <p className="text-white/70 text-sm">
                      Estruture seu plano financeiro com especialistas
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60">Investimento</div>
                    <div className="text-5xl font-bold text-[#F2C94C]">
                      R$ {finalPrice}
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    Com base em suas respostas, preparamos uma consultoria exclusiva para estruturar seu plano financeiro e alcançar seus objetivos.
                  </p>

                  <button
                    onClick={handleComprar}
                    className="w-full mt-8 bg-[#F2C94C] hover:bg-[#E5BD43] text-[#003366] font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Comprar Agora
                  </button>

                  <p className="text-xs text-white/50 text-center pt-2">
                    Acesso imediato após o pagamento
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}