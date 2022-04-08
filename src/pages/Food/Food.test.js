import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';
import mockFetch from '../../mocks/mockFetch';

describe('Teste page food', () => {
  const rota = '/foods';
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  const card = '0-recipe-card';
  const numberOfCards = 11;
  it('Carregue as 12 primeiras receitas de comidas, uma em cada card',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(rota);
      expect(await screen.findByTestId(card)).toBeInTheDocument();
      for (let i = 0; i < numberOfCards; i += 1) {
        expect(screen.getByTestId(`${i}-recipe-card`)).toBeInTheDocument();
      }
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  it('Ao clicar em uma receita, a rota deve mudar para a receita em progresso',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(rota);
      fireEvent.click(await screen.findByTestId('0-recipe-card'));
      expect(history.location.pathname).toBe('/foods/52977');
    });
});
