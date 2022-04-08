import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste a página explore Drinks', () => {
  const exploreByIngredients = 'explore-by-ingredient';
  const exploreSurpriseMe = 'explore-surprise';
  const exploreByNationality = 'explore-by-nationality';
  const rota = '/explore/foods';
  it('Tem os data-testids explore-drinks e uma card', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    expect(screen.getByTestId(exploreByIngredients)).toBeInTheDocument();
    expect(screen.getByTestId(exploreSurpriseMe)).toBeInTheDocument();
  });
  it('teste filterByIngredients', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(exploreByIngredients));
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  it('teste filterByNationality', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(exploreByNationality));
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });
  it('teste surpriseMe', () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(exploreSurpriseMe));
    expect(history.location.pathname).toBe(rota);
  });
});
