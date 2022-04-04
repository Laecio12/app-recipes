import React, { useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Menu, Button, Search } from './styles';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import { useFoods } from '../../hooks/useFoods';
import { useDrinks } from '../../hooks/useDrinks';
import { getFetch } from '../../services/api';

const Header = ({ value }) => {
  const { setFoods } = useFoods();
  const { setDrinks } = useDrinks();
  const [searchBar, setSearchBar] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const history = useHistory();
  let result = [];

  const checkOneResult = (obj) => {
    if (obj.length === 1 && value === 'Foods') {
      const { idMeal } = obj[0];
      history.push(`/foods/${idMeal}`);
    } else if (obj.length === 1 && value === 'Drinks') {
      const { idDrink } = obj[0];
      history.push(`/drinks/${idDrink}`);
    }
  };

  const getByFoodName = async () => {
    try {
      result = await getFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
      if (result.meals.length) {
        setFoods(result.meals);
      }
    } catch (error) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    checkOneResult(result.meals);
  };

  const getByDrinkName = async () => {
    try {
      result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
      if (result.drinks.length) {
        setDrinks(result.drinks);
      }
    } catch (error) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    checkOneResult(result.drinks);
  };

  const searchType = (target) => {
    setRadioFilter(target.id);
  };

  const FilterByRadio = async () => {
    if (value === 'Foods') {
      switch (radioFilter) {
      case 'Ingredients':
        result = await getFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        setFoods(result.meals);
        checkOneResult(result.meals);
        break;
      case 'Name':
        getByFoodName();
        break;
      case 'Firstletter':
        if (inputSearch.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        result = await getFetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        setFoods(result.meals);
        checkOneResult(result.meals);
        break;
      default:
        break;
      }
    } if (value === 'Drinks') {
      switch (radioFilter) {
      case 'Ingredients':
        result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        setDrinks(result.drinks);
        checkOneResult(result.drinks);
        break;
      case 'Name':
        getByDrinkName();
        break;
      case 'Firstletter':
        if (inputSearch.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        setDrinks(result.drinks);
        checkOneResult(result.drinks);
        break;
      default:
        break;
      }
    }
  };

  return (
    <>
      <Container>
        <Menu>
          <Button type="button" onClick={ () => history.push('/profile') }>
            <img
              src={ profileIcon }
              alt="Profile icon"
              data-testid="profile-top-btn"
            />
          </Button>
          <h1 data-testid="page-title">{ value }</h1>
          <Button type="button" onClick={ () => setSearchBar(!searchBar) }>
            <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
          </Button>
        </Menu>
      </Container>
      {
        searchBar && (
          <Search>
            <form
              data-testid="form-add-input"
              onSubmit={ (event) => event.preventDefault() }
            >
              <div>
                <label htmlFor="search">
                  <input
                    onChange={ ({ target }) => setInputSearch(target.value) }
                    id="search"
                    data-testid="search-input"
                    placeholder="Search Recipe"
                  />
                </label>
              </div>
              <label htmlFor="ingredients">
                <input
                  id="Ingredients"
                  type="radio"
                  data-testid="ingredient-search-radio"
                  name="radio"
                  onChange={ ({ target }) => (searchType(target)) }
                />
                Ingredients
              </label>
              <label htmlFor="name">
                <input
                  id="Name"
                  type="radio"
                  data-testid="name-search-radio"
                  name="radio"
                  onChange={ ({ target }) => (searchType(target)) }
                />
                Name
              </label>
              <label htmlFor="first-letter">
                <input
                  id="Firstletter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="radio"
                  onChange={ ({ target }) => (searchType(target)) }
                />
                First Letter
              </label>
              <button
                id="button"
                type="button"
                label="button"
                data-testid="exec-search-btn"
                onClick={ FilterByRadio }
              >
                Search
              </button>
            </form>
          </Search>
        )
      }
    </>
  );
};

Header.propTypes = {
  value: string.isRequired,
};

export default Header;
