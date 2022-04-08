import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste a  página profile', () => {
  const rota = '/profile';
  const doneRecipes = 'profile-done-btn';
  const email = 'profile-email';
  const favoriteRecipes = 'profile-favorite-btn';
  const logoutBtn = 'profile-logout-btn';

  it('Tem os data-testids profile', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(doneRecipes)).toBeInTheDocument();
    expect(screen.getByTestId(favoriteRecipes)).toBeInTheDocument();
    expect(screen.getByTestId(logoutBtn)).toBeInTheDocument();
  });
  it('teste se ao clicar em doneRecipes muda a rota para "done-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(doneRecipes));
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('teste se ao clicar em favoriteRecipes muda a rota para "favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(favoriteRecipes));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('teste se ao clicar em logout muda a rota para "/"', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(logoutBtn));
    expect(history.location.pathname).toBe('/');
  });
});
