import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles';

const CardRecommendation = ({ itemImg, category, title, index }) => (
  <Container
    data-testid={ `${index}-recomendation-card` }
  >
    <img src={ itemImg } alt={ title } />
    <p>{category}</p>
    <h3 data-testid={ `${index}-recomendation-title` }>{title}</h3>
  </Container>
);

CardRecommendation.propTypes = {
  itemImg: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default CardRecommendation;
