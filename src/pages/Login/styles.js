import styled from 'styled-components';
import background from '../../images/background.png';

export const Container = styled.div`
  background-image: url(${background});
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding:0 20px;

`;

export const Form = styled.form`
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 7px;
  box-shadow:0 0 1em rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  height: 50vh;
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
  background-color: #333;
  border: none;
  border-radius: 5px;
  box-shadow:0 0 1em rgba(0,0,0,0.1);
  color: #fff;
  margin-top: 20px;
  padding: 10px 20px;
  width: 60%;

  &:hover {
    transition: 0.2s;
    filter: brightness(0.7);
  }
`;
