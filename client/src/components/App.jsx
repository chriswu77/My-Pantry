import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { authActions } from '../../store/auth';
import { ingredientsActions } from '../../store/ingredients';
import { recipesActions } from '../../store/recipes';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import RecipePage from './RecipePage';

const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [wasInitialized, setWasInitialized] = useState(false);

  const getUser = async () => {
    const response = await axios.get('/api/users');

    if (response.data.userId) {
      dispatch(authActions.logIn(response.data.userId));
    } else {
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
      const ingredientsData = await axios.get(
        `/api/users/${userId}/ingredients`
      );
      dispatch(ingredientsActions.set(ingredientsData.data));
      // get saved recipes
      const recipesData = await axios.get(`/api/users/${userId}/recipes`);
      dispatch(recipesActions.set(recipesData.data));
    }
  }, [userId]);

  return (
    <div id="app">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <PrivateRoute
          path="/recipes/:id"
          component={RecipePage}
          wasInitialized={wasInitialized}
        />
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
