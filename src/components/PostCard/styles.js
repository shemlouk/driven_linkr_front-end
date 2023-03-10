import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-width: 700px;
  min-width: 500px;
  min-height: 278px;
  margin-bottom: 16px;
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
