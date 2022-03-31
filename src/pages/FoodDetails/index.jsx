import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDrinksRecommendations, getFoodDetails } from '../../services/api';
import CardRecommendation from '../../components/CardRecommendation';
import shareIcon from '../../images/shareIcon.svg';

import {
  Cards,
  Container,
  Content,
  FavoriteBtn,
  ShareBtn,
  StartRecipeBtn,
} from './styles';
import copyToClipboard from '../../utils/copyLink';

const FoodDetails = ({ match }) => {
  const [food, setFood] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [inProgressRecipe, setInProgressRecipe] = React.useState(false);
  const [doneRecipe, setDoneRecipe] = React.useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { params } = match;
  const { id } = params;

  const history = useHistory();

  useEffect(() => {
    async function getFood() {
      const meal = await getFoodDetails(id);
      const recommendationsData = await getDrinksRecommendations();

      setFood(meal);
      setRecommendations(recommendationsData);
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const findRecipe = doneRecipes.some((recipe) => recipe.id === id);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    if (inProgressRecipes) setInProgressRecipe(true);

    setDoneRecipe(findRecipe);
    getFood();
  }, [id]);

  useEffect(() => {
    const getIngredients = () => {
      const ingredientsData = [];
      Object.keys(food).forEach((key) => {
        if (key.includes('strIngredient')
      && String(food[key]).length > 0 && food[key] !== null) {
          ingredientsData.push(food[key]);
        }
      });
      setIngredients(ingredientsData);
    };
    getIngredients();
  }, [food]);

  const copyLink = () => {
    copyToClipboard(`http://localhost:3000${history.location.pathname}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, +'2000');
  };

  return (
    <Container>
      <Content>
        <img
          data-testid="recipe-photo"
          src={ food.strMealThumb }
          alt={ food.strMeal }
        />
        <h1 data-testid="recipe-title">
          {food.strMeal}
        </h1>
        <ShareBtn
          data-testid="share-btn"
          onClick={ copyLink }
        >
          {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="Share" />}
        </ShareBtn>
        <FavoriteBtn data-testid="favorite-btn">Favorite</FavoriteBtn>
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
          width="100%"
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
              isDone={ doneRecipe }
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
