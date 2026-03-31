import React, { useState, useEffect } from 'react';
import FormNavigation from './components/FormNavigation';
import PlayerPage from './components/PlayerPage';
import CaixaEducaPage from './components/CaixaEducaPage';
import ReportsPage from './components/ReportsPage';
import { navigate } from './utils/navigate';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname || '/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => navigate('/');

  if (currentRoute === '/plataforma') {
    return <CaixaEducaPage onBack={navigateToHome} />;
  }

  if (currentRoute === '/watch') {
    return <PlayerPage onBack={navigateToHome} />;
  }

  if (currentRoute === '/insights') {
    return <ReportsPage />;
  }

  return <FormNavigation />;
}

export default App;