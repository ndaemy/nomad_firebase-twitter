import { useState } from 'react';

import Router from 'components/Router';
import { authService } from 'fbConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!authService.currentUser);

  return (
    <>
      <Router isLoggedIn={isLoggedIn} />
      <footer>Soultree-Fly &copy; {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
