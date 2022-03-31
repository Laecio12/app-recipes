import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import RecipesInProgress from '.';
import App from '../../App';

const EIGTH = 8;
const FOUR = 4;
const URL_DRINK = '/drinks/11007/in-progress';
const URL_MEAL = '/foods/52772/in-progress';

describe('Renderiza os elementos na tela ao acessar', () => {
    const { history } = renderWithRouter(<App />);
    test('Ao clicar numa comida renderiza imagem, título e categoria', () => {
        history.push(URL_MEAL);
    const imgFood = screen.findByTestId('recipe-photo');
    const headerTitle = screen.findByRole('heading', { name: /Teriyaki Chicken/i });
    const category = screen.findByText(/Chicken/i);
    expect(imgFood).toBeDefined();
    expect(headerTitle).toBeDefined();
    expect(category).toBeDefined();
  });
  test('Ao clicar numa comida renderiza lista de ingredientes com quantidades', () => {
    history.push(URL_MEAL);
    const ingredients = screen.findAllByRole('checkbox');
    const quantity = screen.findAllByTestId(/strMeasure/i);
    expect(ingredients).toHaveLength(EIGTH);
    expect(quantity).toHaveLength(EIGTH);
  });
  test('Ao clicar numa comida renderiza instruções', () => {
    history.push(URL_MEAL);
    const instructions = screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
  test('Ao clicar numa bebida renderiza imagem, título e se é alcoolica', () => {
    history.push(URL_DRINK);
    const imgFood = screen.findByTestId('recipe-photo');
    const headerTitle = screen.findByRole('heading', { name: /Margarita/i });
    const alcoholic = screen.findByText(/Ordinary Drink/i);
    expect(imgFood).toBeDefined();
    expect(headerTitle).toBeDefined();
    expect(alcoholic).toBeDefined();
  });
  test('Ao clicar numa bebida renderiza lista de ingredientes com quantidades', () => {
    history.push(URL_DRINK);
    const ingredients = screen.findAllByTestId('checkbox');
    const quantity = screen.findAllByTestId(/strMeasure/i);
    expect(ingredients).toHaveLength(FOUR);
    expect(quantity).toHaveLength(FOUR);
  });
  test('Ao clicar numa bebida renderiza instruções', () => {
    history.push(URL_DRINK);
    const instructions = screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
});

describe('Lista de ingredientes', () => {
  test('Existe um checkbox para cada ingrediente na tela de comida', () => {});
  test('Existe um checkbox para cada ingrediente na tela de bebida', () => {});
  test('Ao clicar no checkbox o texto é grifado', () => {});
});

describe('LocalStorage', () => {
  test('O progresso da receita é salvo no LocalStorage na chave inProgressRecipes', () => {});
});

describe('Favoritar e compartilhar', () => {
  test('Verifique se ao clicar em compartilhar o link é copiado', () => {});
  test('Verifica se ao clicar no coração ele fica vermelho', () => {});
});
describe('Botão de finalizar', () => {
  test('O botão começa desabilitado', () => {

  });
  test('O botão desabilita apenas quando todos os checks são preenchidos', () => {

  });
  test('Ao clicar no botão redireciona para página done-recipes', () => {});
});
