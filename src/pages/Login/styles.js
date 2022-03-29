import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export const Form = styled.form`
  // display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
`;

export const ButtonSubmit = styled.button`
  background-color: #ffc107;
  border: none;
`;
