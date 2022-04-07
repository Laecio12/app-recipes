import styled from 'styled-components';

export const Container = styled.div`
`;

export const FoodPageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    section:nth-of-type(1) {
    display: flex;
    width: 90vw;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 10px;
    }

    button {
    padding: 2px;
    width: 70px;
    margin: 3px 0;
    background-color: ${({ theme }) => theme.colors.darkGray50};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px; 
    border-style: hidden;
    padding: 5px;
    }

    section:nth-of-type(2) {
    display: flex;
    flex-wrap: wrap;
    width: 299px;
    justify-content: space-around;
    margin-bottom: 25px;
    }

    section a {
      margin: 15px 0;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.darkGray};
    }

    @media (min-width: 640px) and (orientation: landscape) {
      section:nth-of-type(2) {
        gap: 15px;
        width: 400px;
      }

      a {
        margin: 15px 15px;
      }
  }

`;
