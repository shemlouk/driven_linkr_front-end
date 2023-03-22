import LoadingPostsSpinner from "../../components/LoadingPostsSpinner";
import { SessionContext } from "../../hooks/SessionContext";
import ButtonSpinner from "../../components/ButtonSpinner";
import { useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import Trending from "../Trending/index";
import Header from "../Header/index";
import API from "../../config/api";
import * as S from "./styles";

const MainPage = ({ children, title, postsAreLoading, profilePicture }) => {
  const [_, path, params] = useLocation().pathname.split("/");
  const {
    updateSession,
    session: { user, auth },
  } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    user.network.includes(Number(params))
  );

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post(`/user/network/${params}`, {}, auth);

      user.network = data.ids ?? [];
      updateSession({ user, auth });
      localStorage.session = JSON.stringify({ user, auth });

      setIsLoading(false);
      setIsFollowing(!isFollowing);
    } catch ({ response }) {
      setIsLoading(false);
      console.error(response);
      alert("Could not follow/unfollow!");
    }
  });

  return (
    <>
      <Header />
      <S.Container>
        <S.TitleBox>
          {(!postsAreLoading || path !== "user") && (
            <>
              <div>
                {path === "user" && <S.ProfilePicture src={profilePicture} />}
                <h1>{title}</h1>
              </div>
              {params != user.id && (
                <S.FollowButton
                  disabled={isLoading}
                  onClick={handleClick}
                  whiteMode={isFollowing}
                >
                  {isLoading && (
                    <ButtonSpinner
                      size={50}
                      color={isFollowing ? "var(--blue)" : "white"}
                      bgColor={isFollowing ? "white" : "var(--blue)"}
                    />
                  )}
                  {isFollowing ? "Unfollow" : "Follow"}
                </S.FollowButton>
              )}
            </>
          )}
        </S.TitleBox>
        <S.ContentWrapper>
          {postsAreLoading ? (
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
