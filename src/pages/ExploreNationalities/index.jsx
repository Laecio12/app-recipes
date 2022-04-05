import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useFetch, getFetch } from '../../services/api';
import FoodCards from '../../components/FoodCards';

const ExploreNationalities = () => {
  const [area, setArea] = useState([]);
  const [selected, setSelected] = useState('All');
  const [cards, setCards] = useState([]);

  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { data } = useFetch(endpoint);

  useEffect(() => {
    if (data) {
      const filterAreas = ['All'];
      data.meals.forEach((item) => {
        filterAreas.push(item.strArea);
      });
      setArea(filterAreas);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      const url = selected === 'All'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`;
      const MAX_ARRAY_LENGTH = 12;
      const listCards = await getFetch(url);
      console.log(listCards);
      setCards(listCards.meals.slice(0, MAX_ARRAY_LENGTH));
    })();
  }, [selected]);

  const getOption = async ({ target: { value } }) => {
    setSelected(value);
  };

  return (
    <>
      <Header value="Explore Nationalities" />
      <select data-testid="explore-by-nationality-dropdown" onChange={ getOption }>
        {
          area.map((item, i) => (
            <option
              key={ i }
              value={ item }
              data-testid={ `${item}-option` }
            >
              { item }

            </option>
          ))
        }
      </select>
      {
        cards
        && cards.map((meal, i) => (
          <FoodCards
            dataTestid={ `${i}-recipe-card` }
            { ...meal }
            index={ i }
            key={ meal.idMeal }
          />
        ))
      }
      <Footer />
    </>
  );
};
export default ExploreNationalities;
