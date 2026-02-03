import React from 'react';

interface LogoProps {
  invert?: boolean;
  height?: string;
}

export default function Logo({ invert = false, height = 'h-8' }: LogoProps) {
  const caixaLogo = invert
    ? 'https://www.caixa.gov.br/PublishingImages/nova-home/icones/x-volume-negativa-54.png'
    : 'https://www.caixa.gov.br/PublishingImages/nova-home/icones/x-volume-positiva-54-v2.png';

  return (
    <div className="flex items-center justify-center gap-3">
<img
  src="https://plataforma.atomeducacional.com.br/atom-logo.svg"
  alt="PREVENT!"
  className={`${height} w-auto object-contain ${invert ? 'invert' : ''}`}
  style={invert ? { filter: 'brightness(20)' } : {}}
/>

      <span className={`text-2xl font-bold ${invert ? 'text-white' : 'text-gray-800'}`}>+</span>
      <img
        src={caixaLogo}
        alt="Caixa"
        className={`${height} w-auto object-contain`}
      />
    </div>
  );
}