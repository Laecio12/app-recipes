import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
// import { apiFoods } from '../services/api';

const FoodsContext = createContext({});

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const getMealInfos = async () => {
    const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await request.json();

  return (
    <FoodsContext.Provider
      value={ {
        foods,
        setFoods,

      } }
    >
      {children}
    </FoodsContext.Provider>
  );
}
// const { foods} = useFoods();
export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
