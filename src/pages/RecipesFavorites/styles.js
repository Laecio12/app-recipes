import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f15;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FilterButtons = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
 button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;

  &:hover {
    transition: 0.2s;
    filter: brightness(0.9);
  }
 }
`;

export const Cards = styled.section`

  
`;
