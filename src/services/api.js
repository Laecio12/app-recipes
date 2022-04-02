import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const recipe = await response.json();
        setData(recipe);
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

export const getMealsAPI = async () => {
  const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const response = await request.json();
  return response;
};
// apiFood.get('/search.php?s=chicken').then(response => {}).catch(error => {});
