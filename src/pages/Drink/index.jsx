import React, { useState, useEffect } from 'react';
import { useDrinks } from '../../hooks/useDrinks';

import Footer from '../../components/Footer';
import DrinkCards from '../../components/DrinkCards';
import Header from '../../components/Header';

const Drink = () => {
  const [categories, setCategories] = useState([]);
  const { getDrinkInfos, drinks, filterByCategory } = useDrinks();

  useEffect(() => {
    getDrinkInfos();
  }, [getDrinkInfos]);

  useEffect(() => {
    const getCategoriesList = async () => {
      try {
        const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const response = await request.json();
        setCategories(response.drinks);
      } catch (error) {
        return error.message;
      }
    };
    getCategoriesList();
  }, []);

  return (
    <>
      <Header value="Drinks" />
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
            </button>
          );
        })}
      </section>
      <p>Drink</p>
      {drinks && drinks.map((drink, index) => {
        const CARDS_QTT = 12;
        if (index >= CARDS_QTT) return null;
        return (
          <DrinkCards
            dataTestid={ `${index}-recipe-card` }
            { ...drink }
            index={ index }
            key={ drink.idDrink }
          />);
      })}
      <Footer />
    </>
  );
};

export default Drink;
