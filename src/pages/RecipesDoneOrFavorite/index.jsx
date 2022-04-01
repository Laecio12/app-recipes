import React, { useEffect, useState } from 'react';
import DoneRecipesCard from '../../components/DoneRecipesCard';
import { Container, FilterButtons } from './styles';

const RecipesDoneOrFavorite = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('doneRecipes')) || [];
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
        doneRecipes.map((recipe, index) => (
          <DoneRecipesCard { ...recipe } key={ index } index={ index } />
        ))

      }
    </Container>
  );
};

export default RecipesDoneOrFavorite;
