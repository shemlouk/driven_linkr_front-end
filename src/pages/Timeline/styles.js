import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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

export const PostBox = styled.div`
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

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    object-fit: cover;
    margin-bottom: 19px;
  }

  div {
    width: 50px;
    font-size: 2em;
    color: #ffffff;
    text-align: center;

    svg {
      width: 22px;
    }

    p {
      font-size: 11px;
      font-family: "Lato", sans-serif;
      font-weight: 400;
      user-select: none;
    }
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PostUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  color: #ffffff;

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }

  div {
    span {
      font-size: 1.2em;
      color: #ffffff;
      text-align: center;
      margin-right: 8px;
    }
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  p {
    color: #b7b7b7;
    font-family: "Lato", sans-serif;
    font-weight: 400;

    a {
      font-weight: 700;
      color: #ffffff;
    }
  }
`;

export const LinkPreview = styled.div`
  display: flex;
  width: 100%;
  height: 155px;
  border-radius: 12px;
  border: 1px solid #4d4d4d;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    filter: brightness(1.1);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    box-sizing: border-box;
    padding: 20px;
    width: 60%;

    span {
      font-size: 16px;
      color: #cecece;
    }

    p {
      font-size: 11px;
      color: #9b9595;
      display: -webkit-box;
      max-width: 200px;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      :last-of-type {
        color: #cecece;
      }
    }
  }

  figure {
    width: 40%;
    height: 100%;
    border-radius: 0px 12px 12px 0px;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
    }
  }
`;

export const SideMenu = styled.div`
  min-width: 300px;
  height: 400px;
  background-color: #171717;
  margin-left: 18px;
  border-radius: 12px;

  p {
    display: flex;
    box-sizing: border-box;
    padding-left: 16px;
    align-items: center;
    width: 100%;
    height: 60px;
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 28px;
    color: #ffffff;
    border-bottom: 1px solid #484848;
  }

  ul {
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    padding-left: 16px;
    color: #ffffff;
    margin-top: 24px;

    li {
      margin-bottom: 16px;
    }
  }
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

export const ImageCover = styled.img`
  object-fit: cover;
`;
