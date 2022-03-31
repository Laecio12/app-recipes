import axios from 'axios';

export const apiFood = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });
export const apiDrinks = axios.create(
  { baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/' },
);

export const getFoodDetails = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals[0];
};

export const getFoodsRecommendations = async () => {
  const MAX_ARRAY_LENGTH = 6;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.meals.slice(0, MAX_ARRAY_LENGTH);
};

export const getDrinkDetails = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return data.drinks[0];
};

export const getDrinksRecommendations = async () => {
  const MAX_ARRAY_LENGTH = 6;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();

  return data.drinks.slice(0, MAX_ARRAY_LENGTH);
};
// apiFood.get('/search.php?s=chicken').then(response => {}).catch(error => {});
