import React from 'react';
import Logo from './Logo';

interface PageHeaderProps {
  transparent?: boolean;
  invertLogo?: boolean;
}

export default function PageHeader({ transparent = false, invertLogo = false }: PageHeaderProps) {
  return (
    <div className={transparent ? 'bg-transparent' : 'bg-gradient-to-br from-slate-50 to-slate-100'}>
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className={invertLogo ? 'invert brightness-200' : ''}>
          <Logo height="h-5" />
        </div>
      </div>
    </div>
  );
}
