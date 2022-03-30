import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { apiDrinks, apiFood } from '../../services/api';
import { Container, Content, FavoriteBtn, ShareBtn, StartRecipeBtn } from './styles';

const CardDetails = ({ match }) => {
  const [food, setFood] = React.useState({});
  const [ingredients, setIngredients] = React.useState([]);
  const [recommendations, setRecommendations] = React.useState([]);

  const { params, url } = match;
  const { id } = params;

  useEffect(() => {
    async function getFood() {
      if (url.includes('/foods')) {
        // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        apiFood.get(`lookup.php?i=${id}`).then((response) => {
          setFood(response.data.meals[0]);
        });
        apiFood.get('search.php?s=').then((response) => {
          setRecommendations(response.data.meals);
        });
      } else {
        apiDrinks.get(`lookup.php?i=${id}`).then((response) => {
          setFood(response.data.drinks[0]);
        });
        apiDrinks.get('search.php?s=').then((response) => {
          setRecommendations(response.data.drinks);
        });
      }
    }

    getFood();
  }, [id, url]);

  useEffect(() => {
    const getIngredients = () => {
      const ingredientsData = [];
      Object.keys(food).forEach((key) => {
        if (key.includes('strIngredient')
      && String(food[key]).length > 0 && food[key] !== null) {
          ingredientsData
            .push(`${food[key]} - ${food[`strMeasure${key.split('nt')[1]}`]}`);
        }
      });
      setIngredients(ingredientsData);
    };
    getIngredients();
  }, [food]);

  console.log(recommendations);
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
        >
          Share
        </ShareBtn>
        <FavoriteBtn data-testid="favorite-btn">Favorite</FavoriteBtn>
        <p data-testid="recipe-category">{food.strCategory}</p>
        {
          ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ ingredient.id }
            >
              { ingredient }
            </p>
          ))
        }
        <p data-testid="instructions">{food.strInstructions}</p>
        <ReactPlayer
          data-testid="video"
          url={ food.strYoutube }
        />
        {
          ingredients.map((ingredient, index) => (
            <p
              data-testid={ `${index}-recomendation-card` }
              key={ ingredient.id }
            >
              recomendação

            </p>
          ))
        }
        <StartRecipeBtn>Start</StartRecipeBtn>
      </Content>
    </Container>
  );
};
CardDetails.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default CardDetails;
