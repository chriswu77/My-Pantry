import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Hero, Form, Button } from 'react-bulma-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../../store/auth';
import NavBar from './NavBar';
import { Background, CenteredDiv, ErrorMessage, FormBox } from './shared';

// styled components
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
// end

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      dispatch(authActions.logIn(response.data._id));
    } catch (err) {
      console.log('login error:', err);
      setErrorText('Invalid username or password');
    }
  };

  return (
    <>
      <NavBar />
      <Hero size="fullheight" hasNavbar renderAs={Background}>
        <Hero.Body renderAs={CenteredDiv} className="p-0">
          <FormBox id="login-form">
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

            {errorText && (
              <ErrorMessage className="is-danger is-light">
                {errorText}
              </ErrorMessage>
            )}

            <SignUpDiv>
              <span>Don&apos;t have an account?</span>
              <SignUpLink to="/signup" renderAs={Link}>
                Sign up
              </SignUpLink>
            </SignUpDiv>
          </FormBox>
        </Hero.Body>
      </Hero>
    </>
  );
};

export default LoginPage;
