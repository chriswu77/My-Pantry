import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Form, Button, Message } from 'react-bulma-components';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../../store/auth';

const LoginFormDiv = styled.div``;

const SignUpDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SignUpLink = styled(Button)`
  border: none;
  padding: 0;
  text-decoration: underline;
  margin-left: 5px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState();
  const [errorText, setErrorText] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/users/login', { username, password });
      dispatch(authActions.logIn(response.data._id));
      setRedirectTo('/');
    } catch (err) {
      console.log('login error:', err);
      setErrorText('Invalid username or password');
    }
  };

  return (
    <LoginFormDiv id="login-form">
      {redirectTo && <Redirect to={{ pathname: redirectTo }} />}
      <form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Label>Username</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Password</Form.Label>
          <Form.Control>
            <Form.Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Button type="submit">Login</Button>
      </form>

      {errorText && <Message.Body color="danger">{errorText}</Message.Body>}

      <SignUpDiv>
        <span>Don&apos;t have an account?</span>
        {/* <SignUpLink to="/signup" renderAs={Link}> */}
        <SignUpLink to="#signup-form" renderAs={Link}>
          Sign up
        </SignUpLink>
      </SignUpDiv>
    </LoginFormDiv>
  );
};

export default LoginForm;
