import React, { useEffect, useState } from 'react';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import CardDoneRecipesOrFavorite from '../../components/CardDoneRecipesOrFavorite';
import { deleteFavoriteRecipe } from '../../services/localStorage';
import { Container, FilterButtons, Cards } from './styles';

const RecipesFavorites = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setDoneRecipes(data);
    setDoneRecipesData(data);
  }, []);

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
      <HeaderWithoutSearch value="Favorite Recipes" />
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
      <Cards>
        {
          doneRecipes && doneRecipes.map((recipe, index) => (
            <CardDoneRecipesOrFavorite
              deleteRecipe={ deleteRecipe }
              isFavorite
              { ...recipe }
              key={ index }
              index={ index }
            />
          ))

        }
      </Cards>
    </Container>
  );
};

export default RecipesFavorites;
