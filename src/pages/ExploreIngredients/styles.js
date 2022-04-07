import styled from 'styled-components';

export const CardIngredient = styled.div`
align-items: center;
display: flex;
flex-direction: column;
background-color: ${({ theme }) => theme.colors.backgroundWhite};
box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.05);
border-radius: 10px;
margin: 10px 15px 0px 15px;
padding: 10px;
gap: 5px;
justify-content: space-evenly;
img {
    border-radius: 50%;
    box-shadow:0 0 1em #b3afaf;
    max-height: 200px;
    max-width: 75%;
    margin: 0 auto;

  }
h4 {
    width: min-content;
}
`;

export const ListCards = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
background-color: ${({ theme }) => theme.colors.background}; 
margin-bottom: 40px;
`;
