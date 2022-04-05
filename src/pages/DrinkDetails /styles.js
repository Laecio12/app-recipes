import styled from 'styled-components';

export const Container = styled.div`
  background-color: #E5E5E5 ; 
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
export const ImageContent = styled.section`
  align-items: center;
  display: flex;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 380px;
  margin-bottom: 10px;
  padding: 10px;

  img {
    border-radius: 50%;
    box-shadow:0 0 1em #000;
    max-height: 200px;
    max-width: 60%;
    margin: 0 auto;

  }
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
  justify-content: center;
  flex-direction: row;
  margin: 10px 0;

  button {
    padding: 10px;
    border-radius: 12px;
    border: #ccc;
    background-color: ${({ theme }) => theme.colors.backgroundWhite};
    margin: 0 10px;
  }

`;
export const StartRecipeBtn = styled.button`
  bottom: 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.darkGray};
  border-radius: 5px;
  color: #fff;
  margin-left: 7%;
  padding: 15px;
  position: fixed;
  width: 80%;

  &:hover {
    transition: 0.2s;

    filter: brightness(0.9);
  }
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  overflow-x: scroll;
  margin-bottom: 40px;
`;

export const Ingredients = styled.div`
  line-height: 2em;
  margin-top: 15px;
  

  p {
    display: flex;
    width: 100%;
  }

  /* span {
    flex: 1;
    border-bottom: 1px dotted #000;
  } */
`;

export const Instructions = styled.div`
  line-height: 1.5em;
  margin-bottom: 20px;
`;
