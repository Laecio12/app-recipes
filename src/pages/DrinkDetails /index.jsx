import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDrinkDetails, getFoodsRecommendations } from '../../services/api';
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
  ImageContent,
  Ingredients,
  Instructions,
} from './styles';
import copyToClipboard from '../../utils/copyLink';
import getIngredients from '../../utils/getIngredients';
import {
  deleteFavoriteRecipe,
  getStorageData,
  setFavoriteRecipes,
} from '../../services/localStorage';

const DrinkDetails = ({ match }) => {
  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(whiteHeartIcon);
  const { params } = match;
  const { id } = params;

  const history = useHistory();

  useEffect(() => {
    async function getDrink() {
      const drinkData = await getDrinkDetails(id);
      const recommendationsData = await getFoodsRecommendations();
      setDrink(drinkData);
      getIngredients(drinkData, setIngredients);
      setRecommendations(recommendationsData);
    }
    const getDataInLocalStorage = getStorageData(id);

    setInProgressRecipe(getDataInLocalStorage.inProgress);
    setDoneRecipe(getDataInLocalStorage.doneRecipe);
    setFavoriteIcon(getDataInLocalStorage.favoriteIcon);

    getDrink();
  }, [id]);

  const copyLink = () => {
    copyToClipboard(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, +'2000');
  };

  const handleFavorite = () => {
    if (favoriteIcon === whiteHeartIcon) {
      setFavoriteIcon(blackHeartIcon);
      setFavoriteRecipes(
        {
          id: drink.idDrink,
          type: 'drink',
          nationality: '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        },
      );
    } else {
      setFavoriteIcon(whiteHeartIcon);
      deleteFavoriteRecipe(drink.idDrink);
    }
  };

  return (
    <Container>
      <Content>
        <ImageContent>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
        </ImageContent>
        <h1
          data-testid="recipe-title"
        >
          {drink.strDrink}
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
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>
        <Ingredients>

          {
            ingredients.map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient.id }
              >
                { `${ingredient} - ${drink[`strMeasure${index + 1}`]}` }
              </p>
            ))
          }
        </Ingredients>
        <Instructions>
          <p data-testid="instructions">{drink.strInstructions}</p>
        </Instructions>
        <Cards>
          {
            recommendations.map((food, index) => (
              <CardRecommendation
                index={ index }
                key={ food.idMeal }
                itemImg={ food.strMealThumb }
                category={ food.strCategory }
                title={ food.strMeal }
              />
            ))
          }
        </Cards>
        {
          !doneRecipe && (
            <StartRecipeBtn
              isDone={ doneRecipe }
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`/drinks/${id}/in-progress`) }
            >
              { inProgressRecipe ? 'Continue Recipe' : 'Start Recipe'}
            </StartRecipeBtn>
          )
        }
      </Content>
    </Container>
  );
};
DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default DrinkDetails;
