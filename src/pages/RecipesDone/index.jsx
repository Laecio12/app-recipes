import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import CardDoneRecipesOrFavorite from '../../components/CardDoneRecipesOrFavorite';
import { Container, FilterButtons } from './styles';

const RecipesDone = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes')) || [];
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

  return (
    <Container>
      <HeaderWithoutSearch value="Done Recipes" />
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
            { ...recipe }
            key={ index }
            index={ index }
          />
        ))

      }
    </Container>
  );
};

export default RecipesDone;
