import React, { useState } from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Menu, Button, Search } from './styles';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = ({ value }) => {
  const [searchBar, setSearchBar] = useState(false);
  const history = useHistory();
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
                    onChange={ ({ target }) => setSearchRecipe(target.value) }
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
                  onChange={ ({ target }) => (setSearchType(target.id)) }
                />
                Ingredients
              </label>
              <label htmlFor="name">
                <input
                  id="Name"
                  type="radio"
                  data-testid="name-search-radio"
                  name="radio"
                  onChange={ ({ target }) => (setSearchType(target.id)) }
                />
                Name
              </label>
              <label htmlFor="first-letter">
                <input
                  id="Firstletter"
                  type="radio"
                  data-testid="first-letter-search-radio"
                  name="radio"
                  onChange={ ({ target }) => (setSearchType(target.id)) }
                />
                First Letter
              </label>
              <button
                id="button"
                type="button"
                label="button"
                data-testid="exec-search-btn"
                onClick={ () => setAPI({ searchType, searchRecipe }) }
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
