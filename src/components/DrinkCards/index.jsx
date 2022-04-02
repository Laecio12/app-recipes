import React from 'react';
import propTypes from 'prop-types';
import DrinkCardContainer from './styles';

const DrinkCards = ({ strDrink, strDrinkThumb, index, dataTestid }) => (
  <DrinkCardContainer data-testid={ dataTestid }>
    <p data-testid={ `${index}-card-name` }>{strDrink}</p>
    <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
  </DrinkCardContainer>
);

DrinkCards.propTypes = {
  index: propTypes.number.isRequired,
  strDrink: propTypes.string.isRequired,
  strDrinkThumb: propTypes.string.isRequired,
  dataTestid: propTypes.string.isRequired,
};

export default DrinkCards;
