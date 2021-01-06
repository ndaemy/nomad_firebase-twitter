import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import Router from 'components/Router';
import { authService } from 'fbConfig';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      <footer>Soultree-Fly &copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
