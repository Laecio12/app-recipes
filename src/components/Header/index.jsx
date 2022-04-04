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

  console.log(value);

  const searchType = (target) => {
    setRadioFilter(target.id);
  };

  const FilterByRadio = async () => {
    if (value === 'Foods') {
      switch (radioFilter) {
      case 'Ingredients':
        result = await getFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        setFoods(result.meals);
        break;
      case 'Name':
        result = await getFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
        setFoods(result.meals);
        break;
      case 'Firstletter':
        if (inputSearch.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        result = await getFetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        setFoods(result.meals);
        break;
      default:
        break;
      }
    } if (value === 'Drinks') {
      switch (radioFilter) {
      case 'Ingredients':
        result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
        setDrinks(result.drinks);
        break;
      case 'Name':
        result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
        setDrinks(result.drinks);
        break;
      case 'Firstletter':
        if (inputSearch.length > 1) {
          return global.alert('Your search must have only 1 (one) character');
        }
        result = await getFetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`);
        setDrinks(result.drinks);
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
