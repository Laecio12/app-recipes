import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useFetch, getUrlRecipe } from '../../services/api';
import { Recipe, Button } from './styles';
// import Share from '../../components/Share';
// import Favorite from '../../components/Favorite';
import { setInProgressRecipes, getInProgressRecipes } from '../../services/localStorage';
import getIngredients from '../../utils/helpers';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const RecipesInProgress = ({ match: { url, params: { id } } }) => {
  const [recipe, setRecipe] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [checks, setChecks] = useState([]);
  const [type, setType] = useState('');

  const history = useHistory();

  const { data } = useFetch(getUrlRecipe(url, id));

  useEffect(() => {
    if (data && url.includes('foods')) {
      setRecipe(data.meals);
      setIngredients(getIngredients(data.meals[0]));
      setType('meals');
    }
    if (data && url.includes('drinks')) {
      setRecipe(data.drinks);
      setIngredients(getIngredients(data.drinks[0]));
      setType('cocktails');
    }
    getInProgressRecipes();
  }, [data, url]);

  useEffect(() => {
    if (ingredients) setIsDisabled(ingredients.length !== checks.length);
  }, [checks, ingredients]);

  const setDecoration = ({ target }, ingredient) => {
    target.parentNode.style
      .textDecoration = target.checked ? 'line-through' : '';

    setChecks((prev) => (target.checked
      ? ([...prev, ingredient])
      : prev.filter((ings) => ings !== ingredient)));

    const ingredientsRecipe = { [id]: [...checks, ingredient] };
    setInProgressRecipes(ingredientsRecipe, type);
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
            <img src={ shareIcon } alt="share" data-testid="share-btn" />
            <img src={ whiteHeartIcon } alt="love" data-testid="favorite-btn" />
            <p data-testid="recipe-category">
              { item.strCategory || item.strAlcoholic }
            </p>
            <h2>Ingredientes</h2>
            { ingredients.map((ing, index) => (
              <div
                htmlFor="ing"
                data-testid="ingredient-step"
                key={ index }
              >
                <input
                  type="checkbox"
                  id="ing"
                  onChange={ (e) => setDecoration(e, ing) }
                  checked={ checks.some((ingredient) => ing === ingredient) }
                />
                {`${ing} - ${recipe[0][`strMeasure${index + 1}`]}`}
              </div>
            ))}
            <h2>Instruções</h2>
            <p data-testid="instructions">
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
