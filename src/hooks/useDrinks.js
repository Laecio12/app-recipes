import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinksAPI } from '../services/api';

const DrinksContext = createContext({});

export function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

  const getDrinkInfos = async () => {
    if (!drinks.length) {
      const data = await getDrinksAPI();
      console.log(data);
      return data && setDrinks(data.drinks.map(({ strDrink, strDrinkThumb, idDrink }) => (
        { strDrink, strDrinkThumb, idDrink })));
    }
  };

  return (
    <DrinksContext.Provider
      value={ {
        drinks,
        setDrinks,
        getDrinkInfos,
      } }
    >
      {children}
    </DrinksContext.Provider>
  );
}
// const { foods} = useDrinks();
export function useDrinks() {
  const context = useContext(DrinksContext);
  return context;
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
