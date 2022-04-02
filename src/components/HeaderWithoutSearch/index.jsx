import React from 'react';
import { string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Menu, Button } from './styles';
import profileIcon from '../../images/profileIcon.svg';

const HeaderWithoutSearch = ({ value }) => {
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
      </Menu>
    </Container>
  );
};

HeaderWithoutSearch.propTypes = {
  value: string.isRequired,
};

export default HeaderWithoutSearch;
