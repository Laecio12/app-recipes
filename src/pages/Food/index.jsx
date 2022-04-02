import React from 'react';
import Footer from '../../components/Footer';

const Food = () => (
  <>
    <h1>Food</h1>
    <div data-testid="0-recipe-card">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      <img src="" data-testid="0-card-img" alt="title" />
      <h2 data-testid="0-card-name">Title</h2>
    </div>
    <div data-testid="1-recipe-card">
      Debitis, molestiae sapiente? Laborum quisquam consequuntur
      <img src="" data-testid="1-card-img" alt="title" />
      <h2 data-testid="1-card-name">Title</h2>
    </div>
    <Footer />
  </>
);

export default Food;
