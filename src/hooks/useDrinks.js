import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { apiDrinks } from '../services/api';

const DrinksContext = createContext({});

export function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

  return (
    <DrinksContext.Provider
      value={ {
        drinks,
        setDrinks,

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
