import { SessionContext } from "../../hooks/SessionContext";
import HashtagContext from "../../hooks/HashtagContext";
import { useContext, useEffect, useState } from "react";
import PostCard from "../../components/PostCard";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import MainPage from "../../layouts/MainPage";

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

    getPostsWithHashtag();
  }, [hashtag]);

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
      <MainPage
        title={`# ${hashtag?.name}`}
        loadMoreFunction={getPostsWithHashtag}
        postsAreLoading={isLoading}
      >
        {postList.length > 0 &&
          postList.map((post) => (
            <PostCard
              key={post.id}
              {...{ ...post, selectHashtag }}
            />
          ))}
      </MainPage>
    </>
  );
}
