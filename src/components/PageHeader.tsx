import React from 'react';
import Logo from './Logo';

interface PageHeaderProps {
  transparent?: boolean;
  invertLogo?: boolean;
  darkBg?: boolean;
}

export default function PageHeader({ transparent = false, invertLogo = true, darkBg = false }: PageHeaderProps) {
  const bgClass = darkBg
    ? 'bg-[#003366]'
    : transparent
    ? 'bg-transparent'
    : 'bg-[#003366]';

  return (
    <div className={bgClass}>
      <div className="max-w-2xl mx-auto px-6 py-4">
        <Logo height="h-5" invert={invertLogo} />
      </div>
    </div>
  );
}
