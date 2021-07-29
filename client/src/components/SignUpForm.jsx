import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bulma-components';

const SignUpForm = (props) => {
  console.log('sign up form');

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [redirectTo, setRedirectTo] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(username, password, confirmPassword);
  };

  return (
    <form>
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

      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;
