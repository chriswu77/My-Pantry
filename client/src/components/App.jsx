import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bulma-components';
import axios from 'axios';
import { authActions } from '../../store/auth';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [wasInitialized, setWasInitialized] = useState(false);
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = await axios.get('/user');
    console.log('get user response: ', response.data);
    if (response.data.userId) {
      console.log('saving user id in state');
      dispatch(authActions.logIn(response.data.userId));
    } else {
      console.log('no user found');
      dispatch(authActions.logOut());
    }

    setWasInitialized(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container id="app">
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <PrivateRoute
          path="/"
          component={Home}
          wasInitialized={wasInitialized}
        />
      </Switch>
    </Container>
  );
};

export default App;
