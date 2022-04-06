import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDrinksAPI, getDrinksByCategoryAPI, getFetch } from '../services/api';

const DrinksContext = createContext({});

export function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [crtCategory, setCrtCategory] = useState('');
  const history = useHistory();

  const getDrinkInfos = async () => {
    if (!drinks.length) {
      const data = await getDrinksAPI();

      setDrinks(data.drinks.map(({ strDrink, strDrinkThumb, idDrink }) => (
        { strDrink, strDrinkThumb, idDrink })));
      setDrinksData(data.drinks
        .map(({ strDrink, strDrinkThumb, idDrink, strCategory }) => (
          { strDrink, strDrinkThumb, idDrink, strCategory })));
    }
  };
  const filterByCategory = async (category) => {
    // refatorar com um if só, setando e apagando a category no estado;
    if (category === 'All') return setDrinks(drinksData);
    if (crtCategory === category) return setDrinks(drinksData);

    if (drinks.length === drinksData.length) {
      const fltrdByCatData = await getDrinksByCategoryAPI(category);
      setCrtCategory(category);
      return fltrdByCatData && setDrinks(fltrdByCatData);
    }
    if (crtCategory) {
      const fltrdByCatData = await getDrinksByCategoryAPI(category);
      setCrtCategory(category);
      return setDrinks(fltrdByCatData);
    }
  };

  const filterByIngredientDrink = async (ingredient) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const data = await getFetch(endpoint);
    setDrinks(data.drinks.map(({ strDrink, strDrinkThumb, idDrink }) => (
      { strDrink, strDrinkThumb, idDrink })));
    history.push('/drinks');
  };

  return (
    <DrinksContext.Provider
      value={ {
        drinks,
        setDrinks,
        getDrinkInfos,
        filterByCategory,
        filterByIngredientDrink,
      } }
    >
      {children}
    </DrinksContext.Provider>
  );
}
export function useDrinks() {
  const context = useContext(DrinksContext);
  return context;
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
