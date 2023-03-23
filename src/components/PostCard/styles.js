import styled from "styled-components";

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #1E1E1E;
  margin-bottom: 16px;
  border-radius: 16px;
`;

export const Container = styled.div`
  display: flex;
  max-width: 700px;
  min-width: 500px;
  min-height: 278px;
  background-color: #171717;
  border-radius: 16px;
  padding: 20px;

  svg {
    transition: 0.3s;
    :hover {
      transform: scale(1.2);
    }
    cursor: pointer;
  }
`;
