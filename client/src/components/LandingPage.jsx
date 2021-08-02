import React from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LandingPage = () => {
  console.log('landing page');
  return (
    <>
      <LoginForm />
      <SignUpForm />
    </>
  );
};

export default LandingPage;
