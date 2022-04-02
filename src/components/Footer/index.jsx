import React from 'react';
// import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BottonMenu, IconsMenu } from './styles';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => {
  const history = useHistory();

  return (
    <BottonMenu data-testid="footer">
      <IconsMenu
        src={ drinkIcon }
        alt="drink-page"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      />
      <IconsMenu
        src={ exploreIcon }
        alt="explore-page"
        data-testid="explore-bottom-btn"
        onClick={ () => history.push('/explore') }
      />
      <IconsMenu
        src={ mealIcon }
        alt="food-page"
        data-testid="food-bottom-btn"
        onClick={ () => history.push('/foods') }
      />
    </BottonMenu>
  );
};

// Footer.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Footer;
