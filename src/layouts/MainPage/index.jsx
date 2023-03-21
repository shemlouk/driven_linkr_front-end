import LoadingPostsSpinner from "../../components/LoadingPostsSpinner";
import { SessionContext } from "../../hooks/SessionContext";
import { useLocation } from "react-router-dom";
import Trending from "../Trending/index";
import Header from "../Header/index";
import { useContext } from "react";
import * as S from "./styles";

const MainPage = ({ children, title, isLoading, profilePicture }) => {
  const [_, path, params] = useLocation().pathname.split("/");
  const {
    session: { user },
  } = useContext(SessionContext);

  return (
    <>
      <Header />
      <S.Container>
        <S.TitleBox>
          <div>
            {path === "user" && !isLoading && (
              <S.ProfilePicture src={profilePicture} />
            )}
            <h1>{title}</h1>
          </div>
          {params != user.id && <S.FollowButton>Follow</S.FollowButton>}
        </S.TitleBox>
        <S.ContentWrapper>
          {isLoading ? (
            <LoadingPostsSpinner />
          ) : (
            <S.PostWrapper>
              <S.PostListing>
                {children ? (
                  children
                ) : (
                  <S.SpecialMessage>There are no posts yet.</S.SpecialMessage>
                )}
              </S.PostListing>
            </S.PostWrapper>
          )}
          <Trending />
        </S.ContentWrapper>
      </S.Container>
    </>
  );
};

export default MainPage;
