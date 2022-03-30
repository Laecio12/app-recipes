import React, { useState, useEffect } from 'react';
// import { apiFood } from '../../services/api';
// import { Container } from './styles';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';

const Food = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesList = async () => {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const response = await request.json();
      setCategories(response.categories);
    };
    getCategoriesList();
  }, []);
  console.log(categories);
  return (
    <>
      {/* <Header /> */}
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
      {/* realiza renderização condicional do Header apenas se clicar no search */}
      {/* <SearchFilters /> */}
      <p>Food</p>
      {/* categoriesList.map((recipeCard) =>  ) */}
      {/* <Footer /> */}
    </>
  );
};

export default Food;
