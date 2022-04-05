import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDrinksRecommendations, getFoodDetails } from '../../services/api';
import CardRecommendation from '../../components/CardRecommendation';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import {
  Cards,
  Container,
  Content,
  FavoriteBtn,
  ShareBtn,
  StartRecipeBtn,
  ShareAndFavorite,
  ImageRecipe,
} from './styles';
import copyToClipboard from '../../utils/copyLink';
import {
  deleteFavoriteRecipe,
  getStorageData,
  setFavoriteRecipes,
} from '../../services/localStorage';
import getIngredients from '../../utils/getIngredients';

const FoodDetails = ({ match }) => {
  const [food, setFood] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = React.useState(false);
  const [doneRecipe, setDoneRecipe] = React.useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);

  const { params } = match;
  const { id } = params;

  const history = useHistory();

  useEffect(() => {
    async function getFood() {
      const recommendationsData = await getDrinksRecommendations();
      const meal = await getFoodDetails(id);

      setFood(meal);
      getIngredients(meal, setIngredients);
      setRecommendations(recommendationsData);
    }
    const getDataInLocalStorage = getStorageData(id);

    setInProgressRecipe(getDataInLocalStorage.inProgress);
    setDoneRecipe(getDataInLocalStorage.doneRecipe);
    setFavoriteIcon(getDataInLocalStorage.favoriteIcon);

    getFood();
  }, [id]);

  const copyLink = () => {
    copyToClipboard(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
    const TWO_SECONDS = 2000;
    setTimeout(() => {
      setIsCopied(false);
    }, TWO_SECONDS);
  };

  const handleFavorite = () => {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
      setFavoriteRecipes(
        {
          id: food.idMeal,
          type: 'food',
          nationality: food.strArea,
          category: food.strCategory,
          alcoholicOrNot: '',
          name: food.strMeal,
          image: food.strMealThumb,
        },
      );
    } else {
      setFavoriteIcon(whiteHeartIcon);
      deleteFavoriteRecipe(food.idMeal);
    }
  };

  return (
    <Container>
      <Content>
        <ImageRecipe
          data-testid="recipe-photo"
          src={ food.strMealThumb }
          alt={ food.strMeal }
        />
        <h1 data-testid="recipe-title">
          {food.strMeal}
        </h1>
        <ShareAndFavorite>

          <ShareBtn
            data-testid="share-btn"
            onClick={ copyLink }
          >
            {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="Share" />}
          </ShareBtn>
          <FavoriteBtn
            onClick={ handleFavorite }
          >
            <img data-testid="favorite-btn" src={ favoriteIcon } alt="Favorite" />
          </FavoriteBtn>
        </ShareAndFavorite>
        <p data-testid="recipe-category">{food.strCategory}</p>
        {
          ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient.id }
            >
              { `${ingredient} - ${food[`strMeasure${index + 1}`]}` }
            </p>
          ))
        }
        <p data-testid="instructions">{food.strInstructions}</p>
        <ReactPlayer
          width="95vw"
          data-testid="video"
          url={ food.strYoutube }
        />
        <h1>Recommendations</h1>
        <Cards>
          {
            recommendations.map((drink, index) => (
              <CardRecommendation
                index={ index }
                key={ drink.idDrink }
                itemImg={ drink.strDrinkThumb }
                category={ drink.strAlcoholic }
                title={ drink.strDrink }
              />
            ))
          }
        </Cards>
        {
          !doneRecipe && (
            <StartRecipeBtn
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/foods/${id}/in-progress`) }
            >
              { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
            </StartRecipeBtn>
          )
        }
      </Content>
    </Container>
  );
};
FoodDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default FoodDetails;
