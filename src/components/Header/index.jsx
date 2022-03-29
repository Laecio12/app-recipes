import React from 'react';
import { Container, Menu, Button } from './styles';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

const Header = () => (
  <Container>
    <Menu>
      <Button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="Profile icon" />
      </Button>
      <h1 data-testid="page-title">Food</h1>
      <Button type="button" data-testid="search-top-btn">
        <img src={ searchIcon } alt="" />
      </Button>
    </Menu>
  </Container>
);

export default Header;
