import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const FilterButtons = styled.section`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.darkGray};
    color: white;
    margin: 10px;
    padding: 10px 20px;
    
    &:hover {
      transition: 0.2s;
      filter: brightness(0.8);
    }
  }
`;

export const lista = styled.ol``;
