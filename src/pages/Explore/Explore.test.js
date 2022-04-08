import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste Explore page', () => {
  const exploreDrinks = 'explore-drinks';
  const exploreFoods = 'explore-foods';

  it(' Tem os data-testids explore-foods e explore-drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    expect(screen.getByTestId(exploreDrinks)).toBeInTheDocument();
    expect(screen.getByTestId(exploreFoods)).toBeInTheDocument();
  });
  it('a rota deve mudar para a página de explorar comidas ou de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    fireEvent.click(screen.getByTestId(exploreDrinks));
    expect(history.location.pathname).toBe('/explore/drinks');
    history.push('/explore');
    fireEvent.click(screen.getByTestId(exploreFoods));
    expect(history.location.pathname).toBe('/explore/foods');
  });
});
