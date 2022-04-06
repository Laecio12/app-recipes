import styled from 'styled-components';

export const CardArea = styled.div`
`;

export const Cards = styled.div``;

export const NationalitiesComponent = styled.div`
background-color: ${({ theme }) => theme.colors.background}; 
display: flex;
flex-direction: column;
align-items: center;

select {
    margin: 10px;
    color: ${({ theme }) => theme.colors.backgroundWhite};
    background-color: ${({ theme }) => theme.colors.darkGray};
    width: 100px;
}
`;

export const ListCards = styled.main`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 40px;
`;
