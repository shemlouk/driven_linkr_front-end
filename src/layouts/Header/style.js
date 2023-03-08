import styled from "styled-components";

export const Header = styled.header`
  width: 100%;
  height: 72px;
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
  padding: 0px 28px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const LogoBox = styled.div`
  font-family: "Passion One";
  font-weight: 700;
  font-size: 49px;
  letter-spacing: 0.2rem;
  user-select: none;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export const LoggedUser = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  align-items: center;
  user-select: none;

  svg {
    display: flex;
    align-items: center;
    font-size: 1.5em;
    color: #ffffff;
    margin-right: 8px;
    transition: 0.3s;
    transform: ${({ active }) => (active ? "rotate(180deg)" : "")};
    cursor: pointer;
  }

  img {
    width: 53px;
    height: 53px;
    border-radius: 50%;
    cursor: pointer;
  }

  ul {
    width: 150px;
    height: 47px;
    display: ${({ active }) => (active ? "flex" : "none")};
    align-items: center;
    padding-left: 37px;
    padding-bottom: 10px;
    position: absolute;
    background: #171717;
    border-radius: 0px 0px 0px 20px;
    bottom: -47px;
    right: -47px;
    z-index: -1;
  }

  li {
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.05em;
    color: white;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const SearchBar = styled.div`
  width: 40%;
  min-width: 350px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px 17px;

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

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    font-size: 2em;
    color: #c6c6c6;
  }
`;
