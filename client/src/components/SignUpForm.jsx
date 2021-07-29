import React from 'react';

const SignUpForm = (props) => {
  console.log('sign up form');

  return (
    <form>
      <label htmlFor="username">
        Username
        <input type="text" name="username" id="username" required />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" required />
      </label>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignUpForm;
