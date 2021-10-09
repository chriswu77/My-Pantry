import React, { useState, useEffect } from 'react';
import { Form, Button, Hero } from 'react-bulma-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import NavBar from './NavBar';
import { Background, CenteredDiv, ErrorMessage, FormBox } from './shared';

const SignUpPage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

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
        setErrorText(null);
        history.push('/login');
      } else {
        setErrorText(response.data.error);
      }
    } catch (err) {
      console.log('signup error:', err);
    }
  };

  return (
    <>
      <NavBar />
      <Hero size="fullheight" hasNavbar renderAs={Background}>
        <Hero.Body renderAs={CenteredDiv} className="p-0">
          <FormBox id="signup-form">
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
          </FormBox>
        </Hero.Body>
      </Hero>
    </>
  );
};

export default SignUpPage;
