import React, { useState } from 'react';
import { AUTH_TOKEN } from '../contants';

const _saveUserData = (token) => {
  localStorage.setItem(AUTH_TOKEN, token);
};
const Login = () => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({
      name,
      email,
      password,
    });
  };

  return (
    <form style={{ width: '500px', margin: '0 auto', padding: 50 }}>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <div className="pointer mr2 button" onClick={() => handleSubmit()}>
          {login ? 'login' : 'create account'}
        </div>
        <div className="pointer button" onClick={() => setLogin(!login)}>
          {login ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </form>
  );
};

export default Login;
