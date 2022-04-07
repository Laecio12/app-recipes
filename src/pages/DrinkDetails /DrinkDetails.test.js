import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';
import mockFetch from '../../mocks/mockFetch';

describe('teste a página FoodDetails', () => {
  const recipePhoto = 'recipe-photo';
  const recipeTitle = 'recipe-title';
  const shareBtn = 'share-btn';
  const favoriteBtn = 'favorite-btn';
  const recipeCategory = 'recipe-category';
  const ingredients = '0-ingredient-name-and-measure';
  const instructions = 'instructions';
  const recommendationCard = '0-recomendation-card';
  const startRecipeBtn = 'start-recipe-btn';

  const rota = '/drinks/178319';
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(' A tela de comida possui todos os atributos data-testid', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);

    expect(await screen.findByTestId(recipePhoto)).toBeInTheDocument();
    expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
    expect(await screen.findByTestId(shareBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(favoriteBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(recipeCategory)).toBeInTheDocument();
    expect(await screen.findByTestId(ingredients)).toBeInTheDocument();
    expect(await screen.findByTestId(instructions)).toBeInTheDocument();
    expect(await screen.findByTestId(recommendationCard)).toBeInTheDocument();
    expect(await screen.findByTestId(startRecipeBtn)).toBeInTheDocument();
  });

  it('O id deve estar disponível nos parâmetros da URL', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    expect(await screen.findByTestId(recipePhoto)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319');
  });

  it('"Start Recipe" seja clicado, a rota deve mudar para receita em progresso',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(rota);

      fireEvent.click(await screen.findByTestId(startRecipeBtn));

      expect(history.location.pathname).toBe('/drinks/178319/in-progress');
    });

  it('verifica se ao clicar no botão de compartilhar, o a url e copiada', () => {
    // https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: () => {},
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(screen.getByTestId(shareBtn));

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/178319');
  });

  it('verifica se ao clicar no botão de favoritar, fica preenchido', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(favoriteBtn));

    expect(screen.getByTestId(favoriteBtn)).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});
// Object.defineProperty(window, 'sessionStorage', { value: {}, writable: true });
