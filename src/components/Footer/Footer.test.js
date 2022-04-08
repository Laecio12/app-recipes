import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste o Footer', () => {
  const drinksBtn = 'drinks-bottom-btn';
  const exploreBtn = 'explore-bottom-btn';
  const foodBtn = 'food-bottom-btn';
  it('Tem os data-testids no footer', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(await screen.getByTestId(drinksBtn)).toBeInTheDocument();
    expect(await screen.getByTestId(exploreBtn)).toBeInTheDocument();
    expect(await screen.getByTestId(foodBtn)).toBeInTheDocument();
  });
  it('Ao clicar em drinks, a rota deve mudar para drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    fireEvent.click(await screen.findByTestId(drinksBtn));
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Ao clicar em food, a rota deve mudar para food', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    fireEvent.click(await screen.findByTestId(foodBtn));
    expect(history.location.pathname).toBe('/foods');
  });
  it('Ao clicar em explore, a rota deve mudar para explore', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    fireEvent.click(await screen.findByTestId(exploreBtn));
    expect(history.location.pathname).toBe('/explore');
  });
});
