import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 700px;
  min-width: 500px;
`;

export const List = styled.ul``;

export const Comment = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;

  &:not(:first-child) {
    border-top: 1px solid #353535;
  }
`;

export const MessageContainer = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 20px;
  width: 100%;
  height: 39px;
`;

export const UserName = styled.span`
  font-weight: 700;
  color: #fff;
`;

export const UserStatus = styled.span`
  color: #565656;
`;

export const Message = styled.p`
  color: #acacac;
`;

export const UserPicture = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 39px;
  height: 39px;
  object-fit: cover;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #252525;
  padding: 0 15px 0 0;
  margin-left: 14px;
  border-radius: 8px;
  height: 39px;
  width: 100%;

  svg {
    color: #fff;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  font-family: "Lato", sans-serif;
  color: #acacac;
  background-color: transparent;
  padding-left: 15px;
  width: 100%;

  ::placeholder {
    font-style: italic;
    color: #575757;
  }
`;
