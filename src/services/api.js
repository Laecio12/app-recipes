import axios from 'axios';

export const apiFood = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });
export const apiDrinks = axios.create(
  { baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/' },
);

// apiFood.get('/search.php?s=chicken').then(response => {}).catch(error => {});
