import styled from "styled-components";

export const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 960px;
  min-width: 725px;
  margin: 0 auto;
  margin-top: 125px;
`;

export const TitleBox = styled.div`
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 43px;
  color: #ffffff;
  margin-bottom: 42px;
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
