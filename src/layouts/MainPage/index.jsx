import LoadingPostsSpinner from "../../components/LoadingPostsSpinner";
import { useCallback, useContext, useEffect, useState } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import ButtonSpinner from "../../components/ButtonSpinner";
import { useLocation, useParams } from "react-router-dom";
import WritePost from "../../layouts/WritePostBox/index";
import InfiniteScroll from "react-infinite-scroller";
import Trending from "../Trending/index";
import Header from "../Header/index";
import API from "../../config/api";
import * as S from "./styles";
import LoadPostBox from "../../components/LoadPostsBox";

const MainPage = ({
  loadMoreFunction,
  postsAreLoading,
  profilePicture,
  children,
  hasMore,
  hasMorePosts,
  offset,
  title,
  postCount,
  refreshPostList
}) => {
  const [_, path] = useLocation().pathname.split("/");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const {
    updateSession,
    session: { user, auth },
  } = useContext(SessionContext);
  const [isFollowing, setIsFollowing] = useState(
    user.network.includes(Number(id))
  );

  const handleClick = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.post(`/user/network/${id}`, {}, auth);

      user.network = data.ids ?? [];
      updateSession({ user, auth });
      localStorage.session = JSON.stringify({ user, auth });

      setIsFollowing(!isFollowing);
    } catch ({ response }) {
      console.error(response);
      alert("Could not follow/unfollow!");
    }
    setIsLoading(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (path !== "user") return;
    setIsFollowing(user.network.includes(Number(id)));
  }, [id]);

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
              {id != user.id && path === "user" && (
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
              {path === "timeline" && user && <WritePost />}
              {hasMorePosts ? 
                <LoadPostBox
                    refreshPostList={refreshPostList}
                    newPosts={postCount}
                /> 
                : null
              }
              <S.PostListing>
                <InfiniteScroll
                  key={offset}
                  pageStart={0}
                  hasMore={hasMore}
                  loadMore={loadMoreFunction}
                  loader={<S.SpecialMessage>Loading...</S.SpecialMessage>}
                >
                  {children ? (
                    children
                  ) : (
                    <S.SpecialMessage>There are no posts yet.</S.SpecialMessage>
                  )}
                </InfiniteScroll>
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
