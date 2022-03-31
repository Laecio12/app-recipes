import axios from 'axios';
import { useEffect, useState } from 'react';

export const apiFood = axios.create({ baseURL: 'www.themealdb.com/api/json/v1/1/' });
export const apiDrinks = axios.create(
  { baseURL: 'www.thecocktaildb.com/api/json/v1/1/' },
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
// apiFood.get('/search.php?s=chicken').then(response => {}).catch(error => {});
