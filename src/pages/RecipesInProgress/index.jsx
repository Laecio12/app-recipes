import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useFetch, getUrlRecipe } from '../../services/api';
import { Recipe, Button, Checkbox } from './styles';
import Share from '../../components/Share';
import Favorite from '../../components/Favorite';
// import { setInProgressRecipes, getInProgressRecipes } from '../../services/localStorage';
import getIngredients from '../../utils/helpers';

const RecipesInProgress = ({ match: { url, params: { id } } }) => {
  const [recipe, setRecipe] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [checks, setChecks] = useState(0);

  const history = useHistory();

  const { data } = useFetch(getUrlRecipe(url, id));

  useEffect(() => {
    if (data && url.includes('foods')) {
      setRecipe(data.meals);
      setIngredients(getIngredients(data.meals[0]));
    }
    if (data && url.includes('drinks')) {
      setRecipe(data.drinks);
      setIngredients(getIngredients(data.drinks[0]));
    }
  }, [data, url, recipe]);

  useEffect(() => {
    if (ingredients) setIsDisabled(ingredients.length !== checks);
  }, [checks, ingredients]);

  const setInLocal = ({ target }) => {
    target.parentNode.style
      .textDecoration = target.checked ? 'line-through' : '';
    const ONE = 1;
    setChecks((prev) => (
      target.checked ? prev + ONE : prev - ONE
    ));
  };

  return (
    <Recipe>
      <h1> RecipesInProgress </h1>
      {
        recipe
        && recipe.map((item, i) => (
          <div key={ i }>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="recipe-in-progress"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{ item.strMeal || item.strDrink }</h1>
            <Share />
            <Favorite />
            <p data-testid="recipe-category">
              { item.strCategory || item.strAlcoholic }
            </p>
            <h2>Ingredientes</h2>
            { ingredients.map((ing, index) => (
              <label
                htmlFor="ing"
                key={ index }
              >
                <Checkbox
                  type="checkbox"
                  id="ing"
                  onChange={ setInLocal }
                  data-testid={ `${index}-ingredient-step` }
                />
                {`${ing} - ${recipe[0][`strMeasure${index + 1}`]}`}
              </label>
            ))}
            <h2>Instruções</h2>
            <p
              data-testid={ `${i}-ingredient-step` }
            >
              { item.strInstructions }

            </p>
            <Button
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ () => history.push('/done-recipes') }
            >
              Finalizar

            </Button>
          </div>
        ))
      }
    </Recipe>
  );
};

RecipesInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipesInProgress;

// riscar elemento: https://pt.stackoverflow.com/questions/423159/ao-selecionar-o-chekbox-preciso-que-a-frase-fique-tachada-segue-img-exemplo
