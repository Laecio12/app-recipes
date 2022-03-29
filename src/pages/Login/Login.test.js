import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import Login from '.';

describe('Test Login page', () => {
  const { getByTestId } = renderWithRouter(<Login />);

  const InputTestId = 'email-input';
  const PasswordTestId = 'password-input';
  const ButtonTestId = 'login-submit-btn';

  const emailInput = getByTestId(InputTestId);
  const passwordInput = getByTestId(PasswordTestId);
  const submitButton = getByTestId(ButtonTestId);

  const userEmail = 'jonhdoe@example.com';
  const userPassword = '12345678';

  it('Teste se a página contém um input para o email, password e um botão', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('A pessoa deve conseguir escrever seu email no input de email', () => {
    userEvent.type(emailInput, userEmail);
    expect(emailInput.value).toBe(userEmail);
  });

  it('A pessoa deve conseguir escrever sua senha no input de senha', () => {
    userEvent.type(passwordInput, userPassword);
    expect(passwordInput.value).toBe(userPassword);
  });

  it('Um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
    renderWithRouter(<Login />);
    const button = screen.getByTestId(ButtonTestId);
    expect(button).toBeDisabled();

    const email = getByTestId(InputTestId);
    const senha = getByTestId(PasswordTestId);
    userEvent.type(email, userEmail);
    userEvent.type(senha, userPassword);

    expect(button).toBeEnabled();
  });

  it(
    'Salve 2 tokens no localStorage chaves mealsToken e cocktailsToken', () => {
      renderWithRouter(<Login />);
      const email = getByTestId(InputTestId);
      const senha = getByTestId(PasswordTestId);
      userEvent.type(email, userEmail);
      userEvent.type(senha, userPassword);

      const button = screen.getByTestId(ButtonTestId);
      userEvent.click(button);

      expect(localStorage.getItem('mealsToken')).toEqual('1');
      expect(localStorage.getItem('cocktailsToken')).toEqual('1');
    },
  );

  it('Salve o e-mail da pessoa usuária no localStorage na chave user', () => {
    renderWithRouter(<Login />);
    const email = getByTestId(InputTestId);
    const senha = getByTestId(PasswordTestId);
    userEvent.type(email, userEmail);
    userEvent.type(senha, userPassword);

    const button = screen.getByTestId(ButtonTestId);
    userEvent.click(button);

    expect(JSON.parse(localStorage.getItem('user')).email).toEqual(userEmail);
  });
  it('Redirecione a pessoa usuária para a tela principal de receitas', () => {
    const { history } = renderWithRouter(<Login />);
    const email = getByTestId(InputTestId);
    const senha = getByTestId(PasswordTestId);
    userEvent.type(email, userEmail);
    userEvent.type(senha, userPassword);

    const button = screen.getByTestId(ButtonTestId);
    userEvent.click(button);
    expect(history.location.pathname).toEqual('/foods');
  });
});
