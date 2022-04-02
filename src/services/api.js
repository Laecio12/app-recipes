import axios from 'axios';
import { useEffect, useState } from 'react';

export const apiFood = axios.create({ baseURL: 'https://www.themealdb.com/api/json/v1/1' });
export const apiDrinks = axios.create(
  { baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/' },
);

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const datasReturned = await response.json();
        setData(datasReturned);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    }
    )();
  }, [url]);
  return { data, isLoading, erro };
};

export const getUrlRecipe = (url, id) => {
  const endpoint = url.includes('foods')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  return endpoint;
};

export const getEndpoint = (url) => {
  const endpoint = url.includes('foods')
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  return endpoint;
};

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

export const getFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
// apiFood.get('/search.php?s=chicken').then(response => {}).catch(error => {});
