import styled from 'styled-components';

export const Container = styled.div`
    background-color: #EFEFEF;
    overflow: hidden;
    height: 70px;
    bottom: 0px;
    
`;

export const Menu = styled.header`
  display: flex;
  justify-content: space-between;
  font-family:  Roboto-Bold;
  border-bottom: 1px solid rgba(var(--b38,219,219,219),1);
  background-color: ${({ theme }) => theme.colors.backgroundLightGray};
  height: 100%;
  align-items:center;
`;

export const Button = styled.button`
  border-style: none;
  margin: 10px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundLightGray};
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
