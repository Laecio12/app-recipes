import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useFetch, getFetch } from '../../services/api';
import { CardArea } from './styles';

const ExploreNationalities = () => {
  const [area, setArea] = useState([]);
  const [selected, setSelected] = useState('');
  const [cards, setCards] = useState([]);

  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const { data } = useFetch(endpoint);

  const history = useHistory();

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
      if (selected) {
        const url = !selected || selected === 'All'
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s'
          : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selected}`;
        const MAX_ARRAY_LENGTH = 12;
        const listCards = await getFetch(url);
        setCards(listCards.meals.slice(0, MAX_ARRAY_LENGTH));
      }
    })();
  }, [selected]);

  const getOption = async ({ target: { value } }) => {
    setSelected(value);
  };

  const handleDetails = (id) => {
    history.push(`/foods/${id}`);
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
      <CardArea>
        {
          cards
          && cards.map((meal, i) => (
            <div
              key={ i }
              onClick={ () => handleDetails(meal.idMeal) }
              aria-hidden="true"
              data-testid={ `${i}-recipe-card` }
            >
              <h2
                data-testid={ `${i}-card-name` }
                id={ meal.strMeal }
              >
                {meal.strMeal}
              </h2>
              <img
                src={ meal.strMealThumb }
                data-testid={ `${i}-card-img` }
                alt={ meal.strMeal }
              />
            </div>
          ))
        }
      </CardArea>
      <Footer />
    </>
  );
};
export default ExploreNationalities;
