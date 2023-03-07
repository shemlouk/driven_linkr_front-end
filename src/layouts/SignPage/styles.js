import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 40%;
  min-width: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  a {
    color: white;
    font-size: 17px;
    line-height: 20px;
  }
  form {
    width: 80%;
    max-width: 429px;
    min-width: 330px;
  }
`;

export const Banner = styled.div`
  width: 60%;
  height: 100vh;
  background-color: var(--black);
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  color: white;
  padding-left: 7%;
  user-select: none;
  h1 {
    font-family: "Passion One", sans-serif;
    font-size: 106px;
    line-height: 117px;
  }
  p {
    width: 80%;
    max-width: 442px;
    font-size: 43px;
    line-height: 64px;
  }
`;
