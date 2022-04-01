import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import FavoriteBtn from './styles';
import {
  deleteFavoriteRecipe,
  setFavoriteRecipes,
} from '../../services/localStorage';

function Favorite(props) {
  console.log(props);
  const { id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image } = props;
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  useEffect(() => {
    let recipeFind = {};
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      recipeFind = favoriteRecipes.find((recipe) => recipe.id === id);
    }
    if (recipeFind) setFavoriteIcon(blackHeartIcon);
    else setFavoriteIcon(whiteHeartIcon);
  }, [id]);

  const handleFavorite = () => {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
      setFavoriteRecipes(
        {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        },
      );
    } else {
      setFavoriteIcon(whiteHeartIcon);
      deleteFavoriteRecipe(id);
    }
  };

  return (
    <FavoriteBtn
      onClick={ handleFavorite }
    >
      <img
        data-testid="favorite-btn"
        src={ favoriteIcon }
        alt="Favorite"
      />
    </FavoriteBtn>
  );
}

Favorite.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Favorite;
