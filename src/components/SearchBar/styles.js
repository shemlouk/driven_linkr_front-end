import styled from "styled-components";

export const Container = styled.div`
  width: 40%;
  min-width: 350px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px 17px;
  position: relative;

  svg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    font-size: 2em;
    color: #c6c6c6;
  }

  input {
    display: flex;
    align-items: center;
    width: 95%;
    height: 95%;
    box-sizing: border-box;
    background-color: transparent;
    font-size: 19px;
    line-height: 23px;
    ::placeholder {
      color: var(--lightgray);
    }
  }
`;

export const ResultBox = styled.ul`
  width: 100%;
  height: fit-content;
  min-height: 45px;
  padding: 0px 17px;
  background-color: #e7e7e7;
  position: absolute;
  border-radius: 8px;
  top: 0px;
  z-index: -1;
  transition: 0.3s;
`;

export const SearchItem = styled.li`
  margin-bottom: 16px;

  a {
    align-items: center;
    display: flex;
    text-decoration: none;
  }

  img {
    width: 39px;
    height: 39px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 12px;
  }

  span {
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    :hover {
      text-decoration: underline;
    }
  }

  p {
    color: var(--gray);
    font-weight: 700;
  }

  :first-of-type {
    margin-top: 60px;
  }

  :last-of-type {
    margin-bottom: 15px;
  }
`;
