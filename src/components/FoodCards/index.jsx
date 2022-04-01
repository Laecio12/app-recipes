import React from 'react';
import propTypes from 'prop-types';

const FoodCards = ({ strMeal, strMealThumb, index }) => (
  <>
    <p data-testid={ `${index}-card-name` }>{strMeal}</p>
    <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
  </>
);

FoodCards.propTypes = {
  index: propTypes.number.isRequired,
  strMeal: propTypes.string.isRequired,
  strMealThumb: propTypes.string.isRequired,
};

export default FoodCards;
