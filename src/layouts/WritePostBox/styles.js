import styled from "styled-components";

export const WritePostBox = styled.div`
  display: flex;
  max-width: 700px;
  min-width: 500px;
  height: 210px;
  margin-bottom: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px 18px;
  font-family: "Lato";
`;

export const LoggedUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    object-fit: cover;
  }
`;

export const PublishForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-left: 18px;

  p {
    color: #707070;
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    text-align: start;
    width: 100%;
    margin-bottom: 15px;
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 8px;
    background-color: #efefef;
    border-radius: 5px;
    padding: 0px 12px;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 5px;
    border: none;

    ::placeholder {
      color: #949494;
    }
  }

  .url-input {
    height: 30px;
  }

  .desc-input {
    resize: none;
    height: 66px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  button {
    width: 112px;
    height: 31px;
    background-color: var(--blue);
    color: #ffffff;
    border-radius: 8px;
    font-weight: 700;
    align-self: flex-end;
    font-size: 14px;
    cursor: pointer;
    :hover {
      filter: brightness(1.1);
    }
  }
`;
