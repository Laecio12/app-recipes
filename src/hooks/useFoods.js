import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsAPI, getFoodsByCategoryAPI } from '../services/api';

// import { apiFoods } from '../services/api';

const FoodsContext = createContext({});

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [crtCategory, setCrtCategory] = useState('');

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
    // refatorar com um if só, setando e apagando a category no estado;
    if (category === 'All') return setFoods(foodData);
    if (crtCategory === category) return setFoods(foodData);

    if (foods.length === foodData.length) {
      const fltrdByCatData = await getFoodsByCategoryAPI(category);
      setCrtCategory(category);
      return fltrdByCatData && setFoods(fltrdByCatData);
    }
    if (crtCategory) {
      const fltrdByCatData = await getFoodsByCategoryAPI(category);
      setCrtCategory(category);
      return setFoods(fltrdByCatData);
    }
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
