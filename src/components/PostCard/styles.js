import styled from "styled-components";

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #1e1e1e;
  margin-bottom: 33px;
  border-radius: 16px;
  margin-top: ${({ isRepost }) => isRepost && "66px"};

  :first-of-type {
    margin-top: 33px;
  }
`;

export const Container = styled.div`
  display: flex;
  max-width: 700px;
  min-width: 500px;
  min-height: 278px;
  background-color: #171717;
  border-radius: 16px;
  padding: 20px;
  z-index: 1;

  svg {
    transition: 0.3s;
    :hover {
      transform: scale(1.2);
    }
    cursor: pointer;
  }
`;

export const RepostSign = styled.div`
  width: 100%;
  height: 70px;
  background-color: #1e1e1e;
  padding-top: 7px;
  padding-left: 13px;
  border-radius: 16px;
  color: white;
  font-size: 11px;
  line-height: 13px;
  position: absolute;
  top: -33px;
  left: 0px;

  div {
    display: flex;
    align-items: center;
  }

  a {
    color: white;
    cursor: pointer;
    margin-left: 4px;
    font-weight: 700;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }

  svg {
    font-size: 1.7em;
    margin-right: 6px;
  }
`;
