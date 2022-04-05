import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
`;
export const Content = styled.div` 
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  h1 {
    text-align: center;
  }
`;
export const ImageRecipe = styled.img`
  border-radius: 50%;
  box-shadow:0 0 1em #000;
`;
export const ShareBtn = styled.button`
  img {
    width: 20px;
    height: 20px;
  }
`;
export const FavoriteBtn = styled.button`
  img {
    width: 20px;
    height: 20px;
  }
`;

export const ShareAndFavorite = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;

  button {
    border: none;
    background: none;
  }

`;
export const StartRecipeBtn = styled.button`
  bottom: 0;
  border: none;
  background: rgb(255, 255, 25);
  border-radius: 5px;
  padding: 15px;
  margin-left: 30%;
  position: fixed;

  &:hover {
    transition: 0.2s;

    filter: brightness(0.9);
  }
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;
