import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LandingPage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <>
      <LoginForm />
      <SignUpForm />
    </>
  );
};

export default LandingPage;
