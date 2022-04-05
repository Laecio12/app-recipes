import React from 'react';
import { screen } from '@testing-library/react';
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
  const video = 'video';
  const recommendationCard = '0-recomendation-card';
  const startRecipeBtn = 'start-recipe-btn';

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(' A tela de comida possui todos os atributos data-testid', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');

    expect(await screen.findByTestId(recipePhoto)).toBeInTheDocument();
    expect(await screen.findByTestId(recipeTitle)).toBeInTheDocument();
    expect(await screen.findByTestId(shareBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(favoriteBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(recipeCategory)).toBeInTheDocument();
    expect(await screen.findByTestId(ingredients)).toBeInTheDocument();
    expect(await screen.findByTestId(instructions)).toBeInTheDocument();
    expect(await screen.findByTestId(video)).toBeInTheDocument();
    expect(await screen.findByTestId(recommendationCard)).toBeInTheDocument();
    expect(await screen.findByTestId(startRecipeBtn)).toBeInTheDocument();
  });

  it('O id deve estar disponível nos parâmetros da URL', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771');
    expect(await screen.findByTestId(recipePhoto)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });
});
