import React, { useState, useEffect } from 'react';
import { Form, Button, Box, Notification } from 'react-bulma-components';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ErrorMessage = styled(Notification)`
  width: fit-content;
`;

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState();
  const [errorText, setErrorText] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorText('Username or password cannot be blank');
      return;
    }

    if (username.length < 6) {
      setErrorText('Username must be at least 6 characters');
      return;
    }

    if (password.length < 8) {
      setErrorText('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users', { username, password });

      if (!response.data.error) {
        console.log('signed up successfully');
        setErrorText(null);
        console.log('responseData', response.data);
        // setRedirectTo('/login');
        setRedirectTo('/');
      } else {
        setErrorText(response.data.error);
        console.log('username already taken');
      }
    } catch (err) {
      console.log('signup error:', err);
    }
  };

  return (
    <Box id="signup-form">
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

        <Form.Field>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control>
            <Form.Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Control>
        </Form.Field>

        <Button type="submit">Sign up</Button>

        {errorText && (
          <ErrorMessage className="is-danger is-light">
            {errorText}
          </ErrorMessage>
        )}
      </form>
    </Box>
  );
};

export default SignUpForm;
