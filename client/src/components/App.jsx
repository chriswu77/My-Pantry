import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../../store/auth';
import { ingredientsActions } from '../../store/ingredients';
import { recipesActions } from '../../store/recipes';
import LandingPage from './LandingPage';
import Home from './Home';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [wasInitialized, setWasInitialized] = useState(false);

  const getUser = async () => {
    const response = await axios.get('/users');
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

  useEffect(async () => {
    if (userId) {
      // get saved ingredients
      const ingredientsData = await axios.get(`/users/${userId}/ingredients`);
      dispatch(ingredientsActions.set(ingredientsData.data));
      // get saved recipes
      const recipesData = await axios.get(`/users/${userId}/recipes`);
      dispatch(recipesActions.set(recipesData.data));
    }
  }, [userId]);

  return (
    <div id="app">
      <Switch>
        <Route exact path="/login" component={LandingPage} />
        <PrivateRoute
          path="/"
          component={Home}
          wasInitialized={wasInitialized}
        />
      </Switch>
    </div>
  );
};

export default App;
