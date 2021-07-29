import React from 'react';

const LoginForm = (props) => {
  console.log('login form');

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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
