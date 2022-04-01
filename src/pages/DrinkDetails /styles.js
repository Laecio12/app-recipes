import styled from 'styled-components';

export const Container = styled.div`
`;
export const Content = styled.div`
  img {
    width: 200px;
    height: 200px;
  }
`;

export const ShareBtn = styled.button`
  img {
    width: 20px;
    height: 20px;
  }
`;
export const FavoriteBtn = styled.button`
  img {
    width: 20px;
    height: 20px;
  }
`;

export const StartRecipeBtn = styled.button`
  position: fixed;
  bottom: 0;
  margin-left: 40%;
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;