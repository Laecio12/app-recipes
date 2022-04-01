import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from './styles';

const Explore = () => {
  const history = useHistory();
  return (
    <Container>
      <Header value="Explore" />
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
