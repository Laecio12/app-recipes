import React from 'react';
import { Container, Form, ButtonSubmit } from './styles';

const Login = () => (
  <Container>
    <Form>
      <input data-testid="email-input" type="text" />
      <input data-testid="password-input" type="password" />
      <ButtonSubmit
        data-testid="login-submit-btn"
      >
        Entrar
      </ButtonSubmit>
    </Form>
  </Container>
);

export default Login;
