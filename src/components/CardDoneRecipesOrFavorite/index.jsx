import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, ShareAndFavorite } from './styles';
import shareIcon from '../../images/shareIcon.svg';
import copyToClipboard from '../../utils/copyLink';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const CardDoneRecipesOrFavorite = (props) => {
  console.log(props);
  const { image, category, nationality, alcoholicOrNot,
    name, index, doneDate, tags, id, type, deleteRecipe, isFavorite } = props;

  const [isCopied, setIsCopied] = useState();

  const copyLink = () => {
    copyToClipboard(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, +'2000');
  };

  return (
    <Container>
      <Link to={ `/${type}s/${id}` }>

        <img data-testid={ `${index}-horizontal-image` } src={ image } alt={ name } />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot || `${nationality} - ${category}`}

      </p>
      <Link to={ `/${type}s/${id}` }>

        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      {isCopied && <p>Link copied!</p>}
      <ShareAndFavorite>
        <button
          onClick={ copyLink }
          type="button"
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
          />
        </button>
        {
          isFavorite && (
            <button
              onClick={ () => deleteRecipe(id) }
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="share"
              />
            </button>
          )
        }
      </ShareAndFavorite>
      {
        tags && tags.slice(0, 2).map((tag) => (
          <p data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>{tag}</p>
        ))
      }
    </Container>
  );
};
CardDoneRecipesOrFavorite.propTypes = {
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
export default CardDoneRecipesOrFavorite;
