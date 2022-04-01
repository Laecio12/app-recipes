import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useFetch, getUrlRecipe } from '../../services/api';
import { Recipe, Button } from './styles';
import Share from '../../components/Share';
import Favorite from '../../components/Favorite';
import { setInProgressRecipes, getInProgressRecipes } from '../../services/localStorage';
import getIngredients from '../../utils/helpers';
// import useFavorite from '../../hooks/useFavorite';

const RecipesInProgress = ({ match: { url, params: { id } } }) => {
  const [recipe, setRecipe] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [checks, setChecks] = useState([]);
  const [type, setType] = useState('');
  const [favorite, setFavorite] = useState({});

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
  }, [data, url]);

  // const { favorite2 } = useFavorite(data);

  useEffect(() => {
    if (type) {
      const ingredientsChecks = getInProgressRecipes()[type][id];
      if (ingredientsChecks) setChecks(ingredientsChecks);
    }
  }, [type, id]);

  useEffect(() => {
    if (ingredients && checks) setIsDisabled(ingredients.length !== checks.length);
  }, [checks, ingredients]);

  useEffect(() => {
    if (recipe) {
      setFavorite({ id,
        type,
        nationality: recipe[0].strArea || '',
        category: recipe[0].strCategory,
        alcoholicOrNot: recipe[0].strAlcoholic || '',
        name: recipe[0].strMeal || recipe[0].strDrink,
        image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,

      });
    }
  }, [recipe, id, type]);

  const setDecoration = (target, ingredient) => {
    target.parentNode.style
      .textDecoration = target.checked ? 'line-through' : '';

    if (target.checked) {
      setChecks([...checks, ingredient]);
      target.setAttribute('checked', '');
    } else {
      setChecks(checks.filter((ings) => ings !== ingredient));
      target.removeAttribute('checked');
    }

    const ingredientsRecipe = { [id]: [...checks, ingredient] };
    setInProgressRecipes(ingredientsRecipe, type);
  };

  /* const isChecked = (ing) => {
    return checks.some((ingredient) => ing === ingredient);
  }; */
  /* if (checks.some((ingredient) => ing === ingredient)) {
      target.parentNode.style.textDecoration = 'line-through';
      target.setAttribute('checked', '');
    } else {
      target.removeAttribute('checked');
    } */

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
            <Share id={ id } type={ type } />
            <Favorite { ...favorite } />
            <p data-testid="recipe-category">
              { item.strCategory || item.strAlcoholic }
            </p>
            <h2>Ingredientes</h2>
            { ingredients.map((ing, index) => (
              checks.some((ingredient) => ing === ingredient)
                ? (
                  <div
                    htmlFor="ing"
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                    style={ { textDecoration: 'line-through' } }
                  >
                    <input
                      type="checkbox"
                      id="ing"
                      onChange={ ({ target }) => setDecoration(target, ing) }
                      defaultChecked
                    />
                    {`${ing} - ${recipe[0][`strMeasure${index + 1}`]}`}
                  </div>
                )
                : (
                  <div
                    htmlFor="ing"
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id="ing"
                      onChange={ ({ target }) => setDecoration(target, ing) }
                    />
                    {`${ing} - ${recipe[0][`strMeasure${index + 1}`]}`}
                  </div>
                )
            ))}
            {/* { ingredients.map((ing, index) => (
              <div
                htmlFor="ing"
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  id="ing"
                  onChange={ ({ target }) => setDecoration(target, ing) }
                  checked={ isChecked(ing) }
                />
                {`${ing} - ${recipe[0][`strMeasure${index + 1}`]}`}
              </div>
            ))} */}
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
// Setar atributos vazios: https://developer.mozilla.org/pt-BR/docs/Web/API/Element/setAttribute
