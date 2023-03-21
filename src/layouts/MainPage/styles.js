import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 960px;
  min-width: 725px;
  margin: 0 auto;
  margin-top: 125px;
`;

export const TitleBox = styled.div`
  color: #ffffff;
  margin-bottom: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    padding-bottom: 15px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostListing = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpecialMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: white;
  letter-spacing: 0.1em;
`;

export const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  background-color: ${({ whiteMode }) => (whiteMode ? "white" : "var(--blue)")};
  border: none;
  font-family: "Lato", sans-serif;
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: ${({ whiteMode }) => (whiteMode ? "var(--blue)" : "white")};
  cursor: pointer;
  :hover {
    filter: brightness(1.1);
  }
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 18px;
  border-radius: 50%;
`;
