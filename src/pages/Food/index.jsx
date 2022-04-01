import React, { useState, useEffect } from 'react';
import FoodCards from '../../components/FoodCards';
// import { apiFood } from '../../services/api';
// import { Container } from './styles';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';

const Food = () => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMealInfos = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const response = await request.json();
      console.log('response', response);
      setMeals(response.meals
        .map(({ strMeal, strMealThumb, idMeal }) => ({ strMeal, strMealThumb, idMeal })));
    };
    getMealInfos();
  }, []);

  useEffect(() => {
    const getCategoriesList = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const response = await request.json();
      setCategories(response.categories);
    };
    getCategoriesList();
  }, []);

  return (
    <>
      {/* <Header /> */}
      {/* realiza renderização condicional do Header apenas se clicar no search */}
      {/* <SearchFilters /> */}
      <section>
        { categories.map(({ strCategory }, index) => {
          const CARDS_QTT = 5;
          if (index === CARDS_QTT) { strCategory = 'All'; }
          if (index > CARDS_QTT) return null;
          return (
            <button type="button" key={ index }>
              {strCategory}
            </button>);
        })}
      </section>
      <p>Food</p>
      {meals.map((meal, index) => {
        const CARDS_QTT = 11;
        if (index > CARDS_QTT) return null;
        console.log('meals', meals);
        return (<FoodCards
          data-testid={ `${index}-recipe-card` }
          { ...meal }
          index={ index }
          key={ meal.idMeal }
        />);
      })}
      {/* categoriesList.map((recipeCard) =>  ) */}
      {/* <Footer /> */}
    </>
  );
};

export default Food;