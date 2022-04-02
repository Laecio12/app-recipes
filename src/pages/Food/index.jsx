import React, { useState, useEffect } from 'react';
import { useFoods } from '../../hooks/useFoods';
import FoodCards from '../../components/FoodCards';
// import { apiFood } from '../../services/api';
// import { Container } from './styles';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

const Food = () => {
  const [categories, setCategories] = useState([]);
  const { getMealInfos, foods, filterByCategory } = useFoods();

  useEffect(() => {
    getMealInfos();
  }, [getMealInfos]);

  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const response = await request.json();
        setCategories(response.meals);
      } catch (error) {
        return error.message;
      }
    };

    getCategoriesList();
  }, []);

  return (
    <>
      <Header value="Foods" />
      <section>
        { categories && categories.map(({ strCategory }, index) => {
          const CARDS_QTT = 5;
          if (index === CARDS_QTT) { strCategory = 'All'; }
          if (index > CARDS_QTT) return null;
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => filterByCategory(strCategory) }
            >
              {strCategory}
            </button>);
        })}
      </section>
      <p>Food</p>
      {foods && foods.map((meal, index) => {
        const CARDS_QTT = 12;
        if (index >= CARDS_QTT) return null;
        return (
          <FoodCards
            dataTestid={ `${index}-recipe-card` }
            { ...meal }
            index={ index }
            key={ meal.idMeal }
          />);
      })}
      <Footer />
    </>
  );
};

export default Food;
