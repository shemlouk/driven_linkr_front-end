import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PostUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #ffffff;

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }

  div {
    span {
      font-size: 1.2em;
      color: #ffffff;
      text-align: center;
      margin-right: 8px;
    }
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  p {
    color: #b7b7b7;
    font-family: "Lato", sans-serif;
    font-weight: 400;

    a {
      font-weight: 700;
      color: #ffffff;
    }
  }
`;
