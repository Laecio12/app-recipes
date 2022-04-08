import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';
import mockFetch from '../../mocks/mockFetch';

const profileBtn = 'profile-top-btn';
const searchInput = 'search-input';
const searchBtn = 'exec-search-btn';
describe('Teste o Header na página food', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  const rota = '/foods';
  const searchForm = 'search-top-btn';
  const pageTitle = 'page-title';

  const filterByBeef = 'Beef-category-filter';
  const filterByBreakfast = 'Breakfast-category-filter';
  const filterByChicken = 'Chicken-category-filter';
  const filterByDesert = 'Dessert-category-filter';
  const filterByGoat = 'Goat-category-filter';

  it('Tem os data-testids profile-top-btn e form-add-input pageTitle', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    expect(await screen.findByTestId(profileBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(searchForm)).toBeInTheDocument();
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();
    expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Breakfast-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Chicken-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Dessert-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('Goat-category-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('Ao clicar no botão profile a rota deve mudar para /profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(profileBtn));
    expect(history.location.pathname).toBe('/profile');
  });

  it('filtro byBeef', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByBeef));
    expect(await screen.findByText('Beef and Mustard Pie'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
  });
  it('filtro breakfast', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByBreakfast));
    expect(await screen.findByText('Breakfast Potatoes'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
  });
  it('filtro by chicken', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByChicken));
    expect(await screen.findByText('Brown Stew Chicken'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
  });
  it('filtro by Desert', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByDesert));
    expect(await screen.findByText('Cashew Ghoriba Biscuits'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
  });
  it('filtro by Goat', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByGoat));
    expect(await screen.findByText('Mbuzi Choma (Roasted Goat)'));
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat');
  });
  it('filtro pelo nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(searchForm));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId(searchInput), { target: { value: 'soup' } },
    );
    fireEvent.click(await screen.findByTestId(searchBtn));
    expect(await screen.findByText('Leblebi Soup'));
  });
  it('filtro pelo ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(searchForm));
    fireEvent.click(await screen.findByTestId('ingredient-search-radio'));
    fireEvent.change(
      await screen.findByTestId(searchInput), { target: { value: 'chicken' } },
    );
    fireEvent.click(await screen.findByTestId(searchBtn));
    expect(await screen.findByText('Kung Pao Chicken'));
  });
  it('filtro pela primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(searchForm));
    fireEvent.click(await screen.findByTestId('first-letter-search-radio'));
    fireEvent.change(
      await screen.findByTestId(searchInput), { target: { value: 'a' } },
    );
    fireEvent.click(await screen.findByTestId(searchBtn));
  });
  it('Não deve ser possível pesquisar por mais de uma letra', async () => {
    window.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(searchForm));
    fireEvent.click(await screen.findByTestId('first-letter-search-radio'));
    fireEvent.change(
      await screen.findByTestId(searchInput), { target: { value: 'aa' } },
    );
    fireEvent.click(await screen.findByTestId(searchBtn));
    expect(global.alert)
      .toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
});

describe('Teste o Header na página drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  const rota = '/drinks';
  const searchForm = 'search-top-btn';
  const pageTitle = 'page-title';

  const filterOrdinary = 'Ordinary Drink-category-filter';
  const filterCocktail = 'Cocktail-category-filter';
  const filterByShake = 'Milk / Float / Shake-category-filter';
  const filterByOther = 'Other/Unknown-category-filter';
  const filterByCocoa = 'Cocoa-category-filter';
  it('Tem os data-testids profile-top-btn e form-add-input pageTitle', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    expect(await screen.findByTestId(profileBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(searchForm)).toBeInTheDocument();
    expect(await screen.findByTestId(pageTitle)).toBeInTheDocument();
    expect(await screen.findByTestId(filterOrdinary)).toBeInTheDocument();
    expect(await screen.findByTestId(filterCocktail)).toBeInTheDocument();
    expect(await screen.findByTestId(filterByShake)).toBeInTheDocument();
    expect(await screen.findByTestId(filterByOther)).toBeInTheDocument();
    expect(await screen.findByTestId(filterByCocoa)).toBeInTheDocument();
    expect(await screen.findByTestId('All-category-filter')).toBeInTheDocument();
  });

  it('Ao clicar no botão profile a rota deve mudar para /profile', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(profileBtn));
    expect(history.location.pathname).toBe('/profile');
    expect(await screen.findByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('filtro byOrdinary Drink', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterOrdinary));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink');
  });
  it('filtro Cocktail', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterCocktail));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
  });
  it('filtro by Shake', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByShake));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake');
  });
  it('filtro by Other', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByOther));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown');
  });
  it('filtro by Cocoa', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(filterByCocoa));
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa');
  });
  it('filtro pelo nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(rota);
    fireEvent.click(await screen.findByTestId(searchForm));
    fireEvent.click(await screen.findByTestId('name-search-radio'));
    fireEvent.change(
      await screen.findByTestId(searchInput), { target: { value: 'lemon' } },
    );
    fireEvent.click(await screen.findByTestId(searchBtn));
  });
});
