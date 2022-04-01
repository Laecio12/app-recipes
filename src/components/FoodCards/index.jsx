import React from 'react';
import propTypes from 'prop-types';

const FoodCards = ({ index }) => (
  <h1>
    {' '}
    FoodCards
    {' '}
    {index + 1}
    {' '}
  </h1>
);

FoodCards.propTypes = {
  index: propTypes.number.isRequired,
};

export default FoodCards;
