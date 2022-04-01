import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Container from './styles';

const ExploreFood = () => {
  const history = useHistory();

  const radomRecipe = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    history.push(`/foods/${data.meals[0].idMeal}`);
  };

  return (
    <Container>

      <button
        onClick={ () => history.push('/explore/foods/ingredients') }
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient

      </button>
      <button
        onClick={ () => history.push('/explore/foods/nationalities') }
        type="button"
        data-testid="explore-by-nationality"
      >
        By Nationality

      </button>
      <button
        onClick={ radomRecipe }
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!

      </button>
      <Footer />
    </Container>
  );
};
export default ExploreFood;
