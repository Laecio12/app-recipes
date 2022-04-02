import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinksAPI, getDrinksByCategoryAPI } from '../services/api';

const DrinksContext = createContext({});

export function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [crtCategory, setCrtCategory] = useState('');

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

  return (
    <DrinksContext.Provider
      value={ {
        drinks,
        setDrinks,
        getDrinkInfos,
        filterByCategory,
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
