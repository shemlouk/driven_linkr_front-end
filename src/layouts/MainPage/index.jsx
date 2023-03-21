import LoadingPostsSpinner from "../../components/LoadingPostsSpinner";
import Trending from "../Trending/index";
import Header from "../Header/index";
import * as S from "./styles";

const MainPage = ({ children, title, isLoading }) => {
  return (
    <>
      <Header />
      <S.PageContainer>
        <S.TitleBox>{title}</S.TitleBox>
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
      </S.PageContainer>
    </>
  );
};

export default MainPage;
