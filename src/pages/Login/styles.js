import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  background-color: #f15;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding:0 20px;

`;

export const Form = styled.form`
  align-items: center;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow:0 0 1em #000;
  display: flex;
  flex-direction: column;
  max-width: 340px;
  min-width: 240px;
  padding: 20px;

  input {
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;

  }
`;

export const ButtonSubmit = styled.button`
  background-color: #ffc107;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;

  &:hover {
    transition: 0.2s;
    filter: brightness(0.9);
  }
`;
