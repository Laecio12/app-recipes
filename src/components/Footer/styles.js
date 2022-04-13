import styled from 'styled-components';

export const BottonMenu = styled.footer`
background-color: ${({ theme }) => theme.colors.darkGray};
display: flex;
justify-content: space-around;
position:fixed;
padding: 5px;
bottom: 0px;
width: 90%;
box-shadow: 0px 10px 10px rgb(0 0 0 / 15%);
border-radius: 26px;
margin: 0 0 10px 15px;

img {
  width: 30px;
  filter: invert(1);
}
`;

export const IconsMenu = styled.img``;
