import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/renderWithRouter';
import App from '../../App';
import mockFetch from '../../mocks/mockFetch';

describe('Teste o Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  const rota = '/foods';
  const searchForm = 'search-top-btn';
  const profileBtn = 'profile-top-btn';
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
      await screen.findByTestId('search-input'), { target: { value: 'soup' } },
    );
    fireEvent.click(await screen.findByTestId('exec-search-btn'));
    expect(await screen.findByText('Leblebi Soup'));
  });
});
