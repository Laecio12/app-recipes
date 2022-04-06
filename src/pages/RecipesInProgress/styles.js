import styled from 'styled-components';

export const RecipeInProgressComponent = styled.main`
background-color: ${({ theme }) => theme.colors.background};
  h1 {
    text-align: center;
  }
  span {
    background-color: ${({ theme }) => theme.colors.darkGray};
    padding: 3px;
    color: #fff;
  }
`;
export const ButtonFinish = styled.button`
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
  }`;

export const Checkbox = styled.input`
// text-decoration: line-through;

`;

export const ImageContent = styled.div`
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

export const Ingredients = styled.div`
  line-height: 2em;
  margin: 15px 10px;
  
  p {
    display: flex;
    width: 100%;
  }
`;

export const Instructions = styled.div`
  line-height: 1.5em;
  margin: 0px 10px 45px 10px;
  text-align: justify;
  `;
