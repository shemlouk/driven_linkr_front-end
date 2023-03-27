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
  margin-bottom: 100px;
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
  font-family: "Oswald";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: white;
  text-align: center;
`;

export const LoadingMorePostsContainer = styled.div`
  height: 78px;
  display: flex;
  margin-top: 60px;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

export const LoadingMessage = styled.p`
  color: #6d6d6d;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.05em;
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
  position: relative;
  overflow: hidden;
`;

export const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 18px;
  border-radius: 50%;
`;
