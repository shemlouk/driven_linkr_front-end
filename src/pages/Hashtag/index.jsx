import { SessionContext } from "../../hooks/SessionContext";
import HashtagContext from "../../hooks/HashtagContext";
import { useContext, useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import { useNavigate } from "react-router-dom";
import Trending from "../../layouts/Trending";
import Header from "../../layouts/Header";
import * as P from "../Timeline/styles";
import API from "../../config/api";

export default function Hashtag() {
  const { hashtag, setHashtag } = useContext(HashtagContext);
  const { session, isLoggedIn } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn || !hashtag) {
      return navigate("/timeline");
    }

    async function getPostsWithHashtag() {
      try {
        const res = (await API.get(`/hashtag/${hashtag.id}`, session.auth))
          .data;
        setPostList(res.slice(0, 20));
        setIsLoading(false);
      } catch (error) {
        console.error(`getPostWithHashtag: ${error}`);
      }
    }

    getPostsWithHashtag();
  }, [hashtag]);

  async function selectHashtag(hashtag) {
    hashtag = hashtag.replace("#", "");

    try {
      const res = (await API.get(`/hashtag/search/${hashtag}`, session.auth))
        .data;
      setHashtag({
        ...res,
      });
    } catch (error) {
      console.error(`selectHashtag: ${error}`);
    }
  }

  return (
    <>
      <Header />
      <P.PageContainer>
        <P.TitleBox data-test="hashtag-title">
          {`# ${hashtag?.name}`}
        </P.TitleBox>
        <P.ContentWrapper>
          <P.PostWrapper>
            <P.PostListing>
              {isLoading ? (
                <P.SpecialMessage>Loading...</P.SpecialMessage>
              ) : postList.length > 0 ? (
                postList.map((post) => (
                  <PostCard key={post.id} {...{ ...post, selectHashtag }} />
                ))
              ) : (
                <P.SpecialMessage>There are no posts yet.</P.SpecialMessage>
              )}
            </P.PostListing>
          </P.PostWrapper>
          <Trending />
        </P.ContentWrapper>
      </P.PageContainer>
    </>
  );
}
