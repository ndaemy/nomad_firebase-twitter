import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

import Navigation from './Navigation';

interface RouterProps {
  isLoggedIn: boolean;
}

function Router({ isLoggedIn }: RouterProps) {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/profile'>
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path='/'>
              <Auth />
            </Route>
            <Redirect from='*' to='/' />
          </>
        )}
      </Switch>
    </HashRouter>
  );
}

export default Router;
