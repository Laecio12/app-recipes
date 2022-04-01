import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardDoneRecipesOrFavorite from '../../components/CardDoneRecipesOrFavorite';
import { deleteFavoriteRecipe } from '../../services/localStorage';
import { Container, FilterButtons } from './styles';

const RecipesDoneOrFavorite = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let data = [];
    if (history.location.pathname === '/favorite-recipes') {
      data = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setIsFavorite(true);
    } else {
      data = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    }
    setDoneRecipes(data);
    setDoneRecipesData(data);
  }, [history]);

  const filterByFood = () => {
    const filteredFoods = doneRecipesData.filter(({ type }) => type === 'food');
    setDoneRecipes(filteredFoods);
  };
  const filterByDrinks = () => {
    const filteredDrinks = doneRecipesData.filter(({ type }) => type === 'drink');
    setDoneRecipes(filteredDrinks);
  };

  const deleteRecipe = (id) => {
    const newData = doneRecipes.filter((item) => item.id !== id);
    setDoneRecipes(newData);
    deleteFavoriteRecipe(id);
  };

  return (
    <Container>
      <FilterButtons>
        <button
          onClick={ () => setDoneRecipes(doneRecipesData) }
          data-testid="filter-by-all-btn"
          type="button"
        >
          All

        </button>
        <button
          onClick={ filterByFood }
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food

        </button>
        <button
          onClick={ filterByDrinks }
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks

        </button>
      </FilterButtons>
      {
        doneRecipes && doneRecipes.map((recipe, index) => (
          <CardDoneRecipesOrFavorite
            deleteRecipe={ deleteRecipe }
            isFavorite={ isFavorite }
            { ...recipe }
            key={ index }
            index={ index }
          />
        ))

      }
    </Container>
  );
};

export default RecipesDoneOrFavorite;
