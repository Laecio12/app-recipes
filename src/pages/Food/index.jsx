import React, { useState, useEffect } from 'react';
import { useFoods } from '../../hooks/useFoods';
import FoodCards from '../../components/FoodCards';
import Footer from '../../components/Footer';
// import { apiFood } from '../../services/api';
// import { Container } from './styles';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';

const Food = () => {
  const [categories, setCategories] = useState([]);
  const { getMealInfos, foods } = useFoods();

  useEffect(() => {
    getMealInfos();
  }, [getMealInfos]);

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
      {foods && foods.map((meal, index) => {
        const CARDS_QTT = 11;
        if (index > CARDS_QTT) return null;
        return (<FoodCards
          dataTestid={ `${index}-recipe-card` }
          { ...meal }
          index={ index }
          key={ meal.idMeal }
        />);
      })}
      {/* categoriesList.map((recipeCard) =>  ) */}
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default Food;
