import firebase from 'firebase/app';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';

import Navigation from './Navigation';

interface RouterProps {
  isLoggedIn: boolean;
  userObj: firebase.User | null;
}

function Router({ isLoggedIn, userObj }: RouterProps) {
  return (
    <HashRouter>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path='/'>
              <Home userObj={userObj} />
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
