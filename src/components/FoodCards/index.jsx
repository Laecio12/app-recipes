import React from 'react';
import propTypes from 'prop-types';
import FoodCardContainer from './styles';

const FoodCards = ({ strMeal, strMealThumb, index, dataTestid }) => (
  <FoodCardContainer data-testid={ dataTestid }>
    <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
  </FoodCardContainer>
);

FoodCards.propTypes = {
  index: propTypes.number.isRequired,
  strMeal: propTypes.string.isRequired,
  strMealThumb: propTypes.string.isRequired,
  dataTestid: propTypes.string.isRequired,
};

export default FoodCards;
