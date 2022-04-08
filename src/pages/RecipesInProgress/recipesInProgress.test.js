import React from 'react';
// import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../../utils/renderWithRouter';
// import RecipesInProgress from '.';
import App from '../../App';
import mockFetch from '../../mocks/mockFetch';

const EIGTH = 8;
// const FOUR = 4;

const URL_MEAL = '/foods/52977/in-progress';

describe('Renderiza os elementos na tela ao acessar', () => {
  // const rota = '/foods';
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Ao clicar numa comida renderiza imagem, título e categoria', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    const imgFood = await screen.findByTestId('recipe-photo');
    const headerTitle = await screen.findByText('Spicy Arrabiata Penne');
    // const category = screen.findByText(/Chicken/i);
    expect(imgFood).toBeDefined();
    expect(headerTitle).toBeDefined();
  });
  test('Ao clicar numa comida renderiza lista de ingredientes com quantidades',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(URL_MEAL);
      const ingredients = await screen.findAllByRole('checkbox');
      const quantity = await screen.findAllByTestId(/ingredient-step/i);
      expect(ingredients).toHaveLength(EIGTH);
      expect(quantity).toHaveLength(EIGTH);
    });
  test('Ao clicar numa comida renderiza instruções', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    const instructions = await screen.findByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });

  it('verifica se ao clicar no botão de compartilhar, o a url e copiada', async () => {
    // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    fireEvent.click(await screen.findByTestId('share-btn'));
    expect(await screen.getByText('Link copied!')).toBeInTheDocument();
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52977');
  });

  it('verifica se ao clicar no botão de favoritar, fica preenchido', async () => {
    const favoriteBtn = 'favorite-btn';
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    fireEvent.click(await screen.findByTestId(favoriteBtn));

    expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });

  it('testa se finalizar um receita é redirecionado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    const checkbox = await screen.findAllByRole('checkbox');

    for (let i = 0; i < checkbox.length; i += 1) {
      userEvent.click(checkbox[i]);
    }

    fireEvent.click(await screen.findByTestId('finish-recipe-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('testa se ao clicar em checbox fica marcado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_MEAL);
    const checkbox = await screen.findAllByRole('checkbox');
    expect(checkbox[0]).toBeInTheDocument();
    fireEvent.click(checkbox[0]);
    expect(screen.getByTestId('0-ingredient-step'))
      .toHaveStyle('text-decoration: line-through');
    fireEvent.click(checkbox[0]);
    expect(screen.getByTestId('0-ingredient-step'))
      .toHaveStyle('');
  });
});
