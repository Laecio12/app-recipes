import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste a página explore by Nationality', () => {
  const rotaFoods = '/explore/foods/nationalities';
  const card = '0-recipe-card';
  const numberOfCards = 11;
  it('Tem os data-testids explore nationality foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rotaFoods);
    expect(await screen.findByTestId(card)).toBeInTheDocument();
  });
  it('teste se existem 12 cards ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rotaFoods);
    expect(await screen.findByTestId(card)).toBeInTheDocument();
    for (let i = 0; i < numberOfCards; i += 1) {
      expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
    }
  });
});
