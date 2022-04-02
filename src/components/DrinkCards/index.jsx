import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DrinkCardContainer from './styles';

const DrinkCards = ({ strDrink, strDrinkThumb, index, dataTestid, idDrink }) => (
  <Link to={ `/drinks/${idDrink}` }>
    <DrinkCardContainer data-testid={ dataTestid }>
      <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
    </DrinkCardContainer>
  </Link>
);

DrinkCards.propTypes = {
  index: propTypes.number.isRequired,
  strDrink: propTypes.string.isRequired,
  strDrinkThumb: propTypes.string.isRequired,
  dataTestid: propTypes.string.isRequired,
  idDrink: propTypes.number.isRequired,
};

export default DrinkCards;
