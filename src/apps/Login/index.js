import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../../components/Login';
import { OktaContext } from '../../components/OktaContext';

const Login = () => {
  const { oktaAuth, authState, setError } = useContext(OktaContext);

  const onSuccess = async (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    setError(err);
    console.error('Logging failed', err);
  };

  if (!authState) return null;
  if (authState.isAuthenticated) {
    console.log('authState', authState);
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <LoginForm onSuccess={onSuccess} onError={onError} />;
};

export default Login;
