import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getDrinkDetails, getFoodsRecommendations } from '../../services/api';
import CardRecommendation from '../../components/CardRecommendation';
import shareIcon from '../../images/shareIcon.svg';

import {
  Container,
  Content,
  FavoriteBtn,
  ShareBtn,
  StartRecipeBtn,
  Cards,
} from './styles';
import copyToClipboard from '../../utils/copyLink';

const DrinkDetails = ({ match }) => {
  const [drink, setDrink] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const [inProgressRecipe, setInProgressRecipe] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { params } = match;
  const { id } = params;

  const history = useHistory();

  useEffect(() => {
    async function getDrink() {
      const dinkData = await getDrinkDetails(id);
      const recommendationsData = await getFoodsRecommendations();
      setDrink(dinkData);
      setRecommendations(recommendationsData);
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const findRecipe = doneRecipes.some((recipe) => recipe.id === id);

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    if (inProgressRecipes) setInProgressRecipe(true);

    setDoneRecipe(findRecipe);
    getDrink();
  }, [id]);

  useEffect(() => {
    const getIngredients = () => {
      const ingredientsData = [];
      Object.keys(drink).forEach((key) => {
        if (key.includes('strIngredient')
      && String(drink[key]).length > 0 && drink[key] !== null) {
          ingredientsData.push(drink[key]);
        }
      });
      setIngredients(ingredientsData);
    };
    getIngredients();
  }, [drink]);

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
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <h1
          data-testid="recipe-title"
        >
          {drink.strDrink}
        </h1>
        <ShareBtn
          data-testid="share-btn"
          onClick={ copyLink }
        >
          {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="Share" />}
        </ShareBtn>
        <FavoriteBtn data-testid="favorite-btn">Favorite</FavoriteBtn>
        <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
        <p data-testid="instructions">{drink.strInstructions}</p>
        <h1>Recommendations</h1>
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
