import React, { useState, useEffect } from 'react';
import FormNavigation from './components/FormNavigation';
import PlayerPage from './components/PlayerPage';

function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentRoute(hash || '/');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentRoute('/');
  };

  if (currentRoute === '/player') {
    return <PlayerPage onBack={navigateToHome} />;
  }

  return <FormNavigation />;
}

export default App;