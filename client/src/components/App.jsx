import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bulma-components';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Home from './Home';

const App = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Container id="app">
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
    </Container>
  );
};

export default App;
