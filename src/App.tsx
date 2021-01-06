import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import Router from 'components/Router';
import { authService } from 'fbConfig';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<firebase.User | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router isLoggedIn={!!userObj} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      <footer>Soultree-Fly &copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
