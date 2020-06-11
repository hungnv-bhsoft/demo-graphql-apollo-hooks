import React, { useState } from 'react';
import { AUTH_TOKEN } from '../contants';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const _saveUserData = (token) => {
  localStorage.setItem(AUTH_TOKEN, token);
};
const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading: signInLoad, error: signInFail }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted({ login: { token } }) {
        _saveUserData(token);
        history.push('/');
        // console.log(login);
      },
    }
  );
  const [signUp, { loading: signUpLoad, error: signUpFail }] = useMutation(
    SIGNUP_MUTATION,
    {
      onCompleted({ signup: { token } }) {
        _saveUserData(token);
        history.push('/');
      },
    }
  );

  const handleSubmit = () => {
    if (login) {
      signIn({ variables: { email, password } });
    } else {
      signUp({ variables: { email, password, name } });
    }
  };

  return (
    <form style={{ width: '500px', margin: '0 auto', padding: 50 }}>
      {signInLoad && <p>Loading...</p>}
      {signInFail && <p>Error :( Please try again</p>}
      {signUpLoad && <p>Loading...</p>}
      {signUpFail && <p>Error :( Please try again</p>}
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
