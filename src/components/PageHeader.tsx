import React from 'react';
import Logo from './Logo';

interface PageHeaderProps {
  transparent?: boolean;
  invertLogo?: boolean;
  darkBg?: boolean;
}

export default function PageHeader({ transparent = false, invertLogo = true, darkBg = false }: PageHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#003366] via-[#003366]/95 to-transparent">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <Logo height="h-5" invert={invertLogo} />
      </div>
    </div>
  );
}
