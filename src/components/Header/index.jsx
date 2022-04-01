import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Menu, Button } from './styles';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = ({ value }) => {
  const history = useHistory();
  return (
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
        <Button type="button">
          <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
        </Button>
      </Menu>
    </Container>
  );
};

Header.propTypes = {
  value: string.isRequired,
};

export default Header;
