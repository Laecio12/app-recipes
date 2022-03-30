import React, { useEffect } from 'react';
// import { apiFood } from '../../services/api';
// import { Container } from './styles';
// import Header from '../../components/Header/index';
// import Footer from '../../components/Footer/index';
import SearchFilters from '../../components/SearchFilters/index';

const Food = () => (
  <>
    {/* realiza renderização condicional do Header apenas se clicar no search */}
    {/* <Header /> */}
    <SearchFilters />
    <p>Food</p>
    {/* categoriesList.map((recipeCard) =>  ) */}
    {/* <Footer /> */}
  </>
);

export default Food;
