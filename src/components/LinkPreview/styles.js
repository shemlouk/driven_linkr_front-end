import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 155px;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    filter: brightness(1.1);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    box-sizing: border-box;
    padding: 20px;
    width: 60%;

    span {
      font-size: 16px;
      color: #cecece;
    }

    p {
      font-size: 11px;
      color: #9b9595;
      display: -webkit-box;
      max-width: 200px;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      :last-of-type {
        color: #cecece;
      }
    }
  }

  figure {
    width: 40%;
    height: 100%;
    border-radius: 0px 12px 12px 0px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
    }
  }
`;
