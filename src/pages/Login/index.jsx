import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, ButtonSubmit } from './styles';
import * as saveInLocalStorage from '../../services/localStorage';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabledButton, setIsDisabledButton] = React.useState(true);

  const history = useHistory();

  const validateForm = (emailValue, passwordValue) => {
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const validateEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 6;

    const isValid = validateEmail.test(emailValue) && passwordValue.length > MIN_LENGTH;
    setIsDisabledButton(!isValid);
  };

  const handleChange = (value, name) => {
    if (name === 'email') {
      setEmail(value);
      validateForm(value, password);
    } else {
      setPassword(value);
      validateForm(email, value);
    }
  };

  const handleSubmit = () => {
    saveInLocalStorage.setCocktailsToken(1);
    saveInLocalStorage.setMealsToken(1);
    saveInLocalStorage.setUser({ email });
    history.push('/foods');
  };

  return (
    <Container>
      <Form>
        <input
          data-testid="email-input"
          name="email"
          type="text"
          onChange={ ({ target }) => handleChange(target.value, target.name) }
          placeholder="Email"
        />
        <input
          name="password"
          data-testid="password-input"
          type="password"
          onChange={ ({ target }) => handleChange(target.value, target.name) }
          placeholder="Senha"
        />
        <ButtonSubmit
          disabled={ isDisabledButton }
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleSubmit }
        >
          Entrar
        </ButtonSubmit>
      </Form>
    </Container>
  );
};

export default Login;
