import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { ModalContext } from "../../hooks/ModalContext";
import HashtagContext from "../../hooks/HashtagContext";
import PostCard from "../../components/PostCard/index";
import MainPage from "../../layouts/MainPage/index";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";

const Timeline = () => {
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);
  const { idDeleted } = useContext(ModalContext);
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  async function getPosts() {
    if (!postList.length) {
      setIsLoading(true);
    }
    try {
      let res;
      if (!session) {
        res = await API.get(`/timeline?offset=${offset}`);
      } else {
        res = await API.get(`/timeline?offset=${offset}`, session.auth);
      }

      if (res.data.length === 0) {
        setHasMore(false);
      }

      setPostList([...postList, ...res.data]);
      setOffset(offset + 10);
    } catch ({ response }) {
      console.error(response);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
    setIsLoading(false);
  }

  async function selectHashtag(hashtag) {
    hashtag = hashtag.replace("#", "");

    try {
      const res = (await API.get(`/hashtag/search/${hashtag}`, session.auth))
        .data;
      setHashtag({
        ...res,
      });
      navigate(`/hashtag/${hashtag}`);
    } catch (error) {
      console.error(`selectHashtag: ${error}`);
    }
  }

  useEffect(() => {
    const newPostList = postList.filter((post) => post.id !== idDeleted);
    setPostList(newPostList);
  }, [idDeleted]);

  return (
    <>
      <MainPage
        title="timeline"
        {...{ offset, hasMore }}
        loadMoreFunction={getPosts}
        postsAreLoading={isLoading}
      >
        {postList.length > 0 &&
          postList.map((post) => (
            <PostCard key={post.id} {...{ ...post, selectHashtag }} />
          ))}
      </MainPage>
    </>
  );
};

export default Timeline;
