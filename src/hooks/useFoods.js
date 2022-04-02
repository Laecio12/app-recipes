import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsAPI } from '../services/api';

// import { apiFoods } from '../services/api';

const FoodsContext = createContext({});

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodData, setFoodData] = useState([]);

  const getMealInfos = async () => {
    if (!foods.length) {
      const data = await getMealsAPI();
      setFoods(data.meals.map(({ strMeal, strMealThumb, idMeal }) => (
        { strMeal, strMealThumb, idMeal })));
      setFoodData(data.meals.map(({ strMeal, strMealThumb, idMeal, strCategory }) => (
        { strMeal, strMealThumb, idMeal, strCategory })));
    }
  };

  const filterByCategory = async (category) => {
    if (category === 'All') return setFoods(foodData);
    const fltrdByCatData = foodData.filter(({ strCategory }) => strCategory === category);
    setFoods(fltrdByCatData);
  };

  return (
    <FoodsContext.Provider
      value={ {
        foods,
        setFoods,
        getMealInfos,
        filterByCategory,
        foodData,
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
