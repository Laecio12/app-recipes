import React from 'react';
import propTypes from 'prop-types';

const FoodCards = ({ strMeal, strMealThumb }) => (
  <>
    <p>{strMeal}</p>
    <img src={ strMealThumb } alt={ strMeal } />
  </>
);

FoodCards.propTypes = {
  strMeal: propTypes.string.isRequired,
  strMealThumb: propTypes.string.isRequired,
};

export default FoodCards;
