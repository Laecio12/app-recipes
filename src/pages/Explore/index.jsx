import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Container from './styles';

const Explore = () => {
  const history = useHistory();
  return (
    <Container>
      <button
        onClick={ () => history.push('/explore/foods') }
        data-testid="explore-foods"
        type="button"
      >
        Explore Foods

      </button>
      <button
        onClick={ () => history.push('/explore/drinks') }
        data-testid="explore-drinks"
        type="button"
      >
        Explore Drinks

      </button>

      <Footer />
    </Container>
  );
};

export default Explore;
