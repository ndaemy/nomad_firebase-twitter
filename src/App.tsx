import { useEffect, useState } from 'react';

import Router from 'components/Router';
import { authService } from 'fbConfig';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} /> : 'Initializing...'}
      <footer>Soultree-Fly &copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
