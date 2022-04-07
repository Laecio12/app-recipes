import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';

describe('teste DoneRecipes', () => {
  const mealName = 'Spicy Arrabiata Penne';
  beforeEach(() => {
    const favoritesRecipes = [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: mealName,
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoritesRecipes));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const rota = '/favorite-recipes';

  const allBtn = 'filter-by-all-btn';
  const filterByFood = 'filter-by-food-btn';
  const filterByDrinks = 'filter-by-drink-btn';
  const image = '0-horizontal-image';
  const textTop = '0-horizontal-top-text';
  const textHorizontal = '0-horizontal-name';
  const doneDate = '0-horizontal-done-date';
  const shareBtn = '0-horizontal-share-btn';
  const horizontalTag0 = '0-Pasta-horizontal-tag';
  const horizontalTag1 = '0-Pasta-horizontal-tag';

  it('Todos os data-testids estão presentes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('favorite-recipes');

    expect(await screen.findByTestId(allBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(filterByFood)).toBeInTheDocument();
    expect(await screen.findByTestId(filterByDrinks)).toBeInTheDocument();
    expect(await screen.findByTestId(image)).toBeInTheDocument();
    expect(await screen.findByTestId(textTop)).toBeInTheDocument();
    expect(await screen.findByTestId(textHorizontal)).toBeInTheDocument();
    expect(await screen.findByTestId(doneDate)).toBeInTheDocument();
    expect(await screen.findByTestId(shareBtn)).toBeInTheDocument();
    expect(await screen.getByTestId(horizontalTag0)).toBeInTheDocument();
    expect(await screen.getByTestId(horizontalTag1)).toBeInTheDocument();
  });

  it('filter by food', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByFood));

    expect(screen.getByTestId(horizontalTag0)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalTag1)).toBeInTheDocument();
    const notExist = screen.queryByText('Aquamarine');
    expect(notExist).toBeNull();
  });
  it('filter by drink', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByDrinks));

    const notExist = screen.queryByText(mealName);
    expect(notExist).toBeNull();
  });
  it('filter all', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(allBtn));

    expect(screen.getByTestId(horizontalTag0)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalTag1)).toBeInTheDocument();
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
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
    history.push(rota);
    fireEvent.click(await screen.findByTestId(shareBtn));

    expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });

  it('teste Delete recipe', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    const deleteRecipe = await screen.findByTestId('0-deleteRecipe');
    fireEvent.click(deleteRecipe);

    const notExist = screen.queryByText(mealName);
    expect(notExist).toBeNull();
  });
});
