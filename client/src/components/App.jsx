import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Home from './Home';

const App = () => {
  console.log('app');

  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div id="app">
      <h1>Hello</h1>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <SignUpForm />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
