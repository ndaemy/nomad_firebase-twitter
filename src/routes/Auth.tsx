import { MouseEvent, useState } from 'react';

import { authService, firebaseInstance } from 'fbConfig';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(true);
  const [error, setError] = useState('');

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      let data;
      if (registerMode) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password,
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (e) {
      setError(e.message);
    }
  }

  function toggleAccount() {
    setRegisterMode(prev => !prev);
  }

  async function handleSocialClick(event: React.MouseEvent<HTMLButtonElement>) {
    const {
      currentTarget: { name },
    } = event;

    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    } else {
      throw Error();
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={registerMode ? 'Sign Up' : 'Log In'} />
        {error}
      </form>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span onClick={toggleAccount}>{registerMode ? 'Log In' : 'Sign Up'}</span>
      <div>
        <button type="button" name="google" onClick={handleSocialClick}>
          Continue with Google
        </button>
        <button type="button" name="github" onClick={handleSocialClick}>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

export default Auth;
