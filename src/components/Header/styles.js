import styled from 'styled-components';

export const Container = styled.div`
    background-color: #EFEFEF;
    overflow: hidden;
    height: 70px;
    bottom: 0px;
    padding-top: 10px;
`;

export const Menu = styled.header`
  display: flex;
  justify-content: space-between;
  font-family:  Roboto-Bold;
`;

export const Button = styled.button`
  border-style: none;
  margin: 10px;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  border-radius: 12px;
  background-color: rgba(51,51,51,0.2);
`;

export const Search = styled.button`
  background-color: #EFEFEF;
  margin-top: 2px;
  padding: 10px;
  width: 100%;
  bottom: 0px;
  border-style:none;
  font-family:  Roboto-Regular;
`;
