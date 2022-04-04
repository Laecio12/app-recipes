import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderWithoutSearch from '../../components/HeaderWithoutSearch';
import Footer from '../../components/Footer';
import { Container, Button } from './styles';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user')) || '';
  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <HeaderWithoutSearch value="Profile" />
      <h2>Profile</h2>
      <p data-testid="profile-email">{ email }</p>
      <Container>
        <Button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
