import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import Footer from '../../components/Footer';
import Container from './styles';

const ExploreDrink = () => {
  const history = useHistory();

  const randomRecipe = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    history.push(`/drinks/${data.drinks[0].idDrink}`);
  };

  return (
    <Container>
      <HeaderWithoutSearch value="Explore Drinks" />
      <button
        onClick={ () => history.push('/explore/drinks/ingredients') }
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient

      </button>
      <button
        onClick={ randomRecipe }
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!

      </button>
      <Footer />
    </Container>

  );
};

export default ExploreDrink;
