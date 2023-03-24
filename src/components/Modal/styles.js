import styled from "styled-components";

export const OverlayBox = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  p {
    font-size: 34px;
    line-height: 41px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 40px;
    text-align: center;
  }

  div {
    width: 70%;
    display: flex;
    justify-content: space-between;

    button {
      width: 135px;
      height: 37px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-family: "Lato", sans-serif;
      font-weight: 700;
      cursor: pointer;

      &.yes-btn {
        background-color: #1877f2;
        color: #ffffff;
      }

      &.no-btn {
        background-color: #ffffff;
        color: #1877f2;
      }
    }
  }
`;
