import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const LogOutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClick = async () => {
    await axios.get('/users/logout');
    dispatch(authActions.logOut());
    history.push('/login');
  };

  return (
    <Button color="primary" onClick={onClick}>
      Log out
    </Button>
  );
};

export default LogOutButton;
