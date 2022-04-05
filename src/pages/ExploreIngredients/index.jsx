import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import { CardIngredient, ListCards } from './styles';
import { useFetch, getEndpoint } from '../../services/api';
import { useFoods } from '../../hooks/useFoods';
import { useDrinks } from '../../hooks/useDrinks';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';

const ExploreIngredients = ({ match: { url } }) => {
  const [ingredients, setIngredients] = useState([]);
  const [type, setType] = useState('');

  const { filterByIngredientFood } = useFoods();
  const { filterByIngredientDrink } = useDrinks();
  const endpoint = getEndpoint(url);
  const { data } = useFetch(endpoint);

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
      setType('meals');
    }
    if (data && url.includes('drinks')) {
      setList(data.drinks);
      setType('drinks');
    }
    setIngredients(listIngredients);
  }, [data, url]);

  const handleRedirectRecipes = (ingredient) => {
    if (type === 'meals') filterByIngredientFood(ingredient);
    if (type === 'drinks') filterByIngredientDrink(ingredient);
    // history.push(`/foods/${ingredient}`);
    // url para bebida por ing: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
    // url para api foods: https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast
    // Retorna: { meals || drinks: [{strMeal: nome, strMealThumb: foto, idMeal: id}, {}]}
  };

  return (
    <>
      <HeaderWithoutSearch value="Explore Ingredients" />
      <h1>Explore Ingredients</h1>
      <ListCards>
        {
          ingredients.map(({ strIngredient, strIngredient1 }, i) => (
            <CardIngredient
              data-testid={ `${i}-ingredient-card` }
              key={ i }
              onClick={ () => handleRedirectRecipes(strIngredient || strIngredient1) }
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
