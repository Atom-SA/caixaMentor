import React, { useState, useEffect } from 'react';
import FormNavigation from './components/FormNavigation';
import PlayerPage from './components/PlayerPage';
import CaixaEducaPage from './components/CaixaEducaPage';
import ReportsPage from './components/ReportsPage';
import { navigate } from './utils/navigate';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname || '/plataforma');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/plataforma');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPlataforma = () => navigate('/plataforma');

  if (currentRoute === '/' || currentRoute === '') {
    navigate('/plataforma');
    return null;
  }

  if (currentRoute === '/plataforma') {
    return <CaixaEducaPage onBack={navigateToPlataforma} />;
  }

  if (currentRoute === '/watch') {
    return <PlayerPage onBack={navigateToPlataforma} />;
  }

  if (currentRoute === '/insights') {
    return <ReportsPage />;
  }

  return <FormNavigation />;
}

export default App;