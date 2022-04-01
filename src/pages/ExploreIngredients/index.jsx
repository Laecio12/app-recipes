import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import { CardIngredient, ListCards } from './styles';
import { useFetch, getEndpoint } from '../../services/api';

const ExploreIngredients = ({ match: { url } }) => {
  const [ingredients, setIngredients] = useState([]);
  const endpoint = getEndpoint(url);
  const { data } = useFetch(endpoint);

  const history = useHistory();

  useEffect(() => {
    const listIngredients = [];
    const TWELVE = 12;

    const setList = (array) => {
      array.forEach((item) => {
        if (listIngredients.length < TWELVE) {
          listIngredients.push(item);
        }
      });
    };

    if (data && url.includes('foods')) {
      setList(data.meals);
    }
    if (data && url.includes('drinks')) {
      setList(data.drinks);
    }
    setIngredients(listIngredients);
  }, [data, url]);

  const handleRedirectRecipes = (/* ingredient */) => {
    history.push('/foods');
    // history.push(`/foods/${ingredient}`);
    // url para bebida por ing: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
    // url para api foods: https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
    // Retorna: { meals || drinks: [{strMeal: nome, strMealThumb: foto, idMeal: id}, {}]}
  };

  return (
    <>
      <h1>Ingredients</h1>
      <ListCards>
        {
          ingredients.map(({ strIngredient, strIngredient1 }, i) => (
            <CardIngredient
              data-testid={ `${i}-ingredient-card` }
              key={ i }
              onClick={ handleRedirectRecipes }
              // onClick={ () => handleRedirectRecipes(strIngredient || strIngredient1) }
            >
              <img
                src={ strIngredient
                  ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png
                  ` }
                alt={ strIngredient || strIngredient1 }
                data-testid={ `${i}-card-img` }
              />
              <h2 data-testid={ `${i}-card-name` }>
                { strIngredient || strIngredient1 }
              </h2>
            </CardIngredient>
          ))
        }
      </ListCards>
      <Footer />
    </>
  );
};

ExploreIngredients.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreIngredients;
