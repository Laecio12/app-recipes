import styled from 'styled-components';

const FoodCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

  a {
    margin: 15px 0;
    text-decoration: none;
    color: #333;
  }

  img {
    width:100px;
    height:100px;
    border-radius: 7px;
  }

  p {
    order: 1;
    margin: 5px 0;
    max-width: 100px;
  }
`;

export default FoodCardContainer;
