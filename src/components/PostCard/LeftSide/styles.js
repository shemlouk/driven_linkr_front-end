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

  div {
    width: 60px;
    font-size: 2em;
    color: #ffffff;
    text-align: center;

    svg {
      width: 22px;
      &.heart{
        color: ${({ isLiked }) => isLiked && "#AC0000"};
      }
    }

    p {
      font-size: 11px;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      user-select: none;
    }
  }
`;
