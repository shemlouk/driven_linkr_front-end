import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    object-fit: cover;
    margin-bottom: 19px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  div {
    width: 60px;
    color: #ffffff;
    text-align: center;

    svg {
      font-size: 1.5em;
      &.heart {
        color: ${({ isLiked }) => isLiked && "#AC0000"};
      }
    }

    p {
      font-size: 11px;
      user-select: none;
      font-family: "Lato", sans-serif;
      margin-bottom: 15px;
    }
  }
`;
