import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow:0 0 1em #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export const ShareAndFavorite = styled.div`
  display: flex;
  
  justify-content: space-around;
  flex-direction: row;
  width: 50%;

  button {
    border: none;
    background: none;
    margin-top: 10px;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 0;
  }
`;
