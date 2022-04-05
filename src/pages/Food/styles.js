import styled from 'styled-components';

export const Container = styled.div`
`;

export const FoodPageContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    section:first-of-type {
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
    }

`;
