import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsAPI } from '../services/api';
// import { apiFoods } from '../services/api';

const FoodsContext = createContext({});

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);

  const getMealInfos = async () => {
    if (!foods.length) {
      const data = await getMealsAPI();
      setFoods(data.meals.map(({ strMeal, strMealThumb, idMeal }) => (
        { strMeal, strMealThumb, idMeal })));
    }
  };

  return (
    <FoodsContext.Provider
      value={ {
        foods,
        setFoods,
        getMealInfos,
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
