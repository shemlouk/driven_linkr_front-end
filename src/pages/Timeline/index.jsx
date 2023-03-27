import React, { useState, useContext, useEffect } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { ModalContext } from "../../hooks/ModalContext";
import HashtagContext from "../../hooks/HashtagContext";
import PostCard from "../../components/PostCard/index";
import MainPage from "../../layouts/MainPage/index";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import { useInterval } from "@react-hooks-library/core"

const Timeline = () => {
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);
  const { idDeleted } = useContext(ModalContext);
  const [postList, setPostList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [allPosts, setAllPosts] = useState([])
  const [hasMorePosts, setHasMorePosts] = useState(false)
  const [newPosts, setNewPosts] = useState([])
  const [postCount, setPostCount] = useState(0)
  const navigate = useNavigate();

  async function getPosts() {
    if (!postList.length) {
      setIsLoading(true);
      console.log(`Getting posts with offset: ${offset}`);
    }
    try {
      const res = await API.get(`/timeline?offset=${offset}`, session.auth);

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

  async function getAllPosts() {
    try {
      const res = await API.get(`/timeline/posts`, session.auth);

      setAllPosts(res.data)
      console.log(res.data.length)
    } catch ({ response }) {
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  useInterval(checkNewPosts, 5000)

  async function checkNewPosts() {
    try {
      const res = await API.get(`/timeline/posts`, session.auth);
      setNewPosts(res.data)

      if (newPosts.length > allPosts.length) {
        setHasMorePosts(true)
        setAllPosts(newPosts)
      }

      const newPostCount = (newPosts.length - allPosts.length)
      setPostCount(newPostCount)
    } catch ({ response }) {
      console.log(response)
    }
  }

  async function refreshPostList() {
    setIsLoading(true);
    setOffset(0);
    setHasMorePosts(false);
    setPostCount(0);
    await getPosts()
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
        refreshPostList={refreshPostList}
        hasMorePosts={hasMorePosts}
        postCount={postCount}
      >
        {postList.length > 0 &&
          postList.map((post) => (
            <PostCard
              key={!post.rb_user_id ? post.id : post.id + "r" + post.rb_user_id}
              {...{ ...post, selectHashtag }}
            />
          ))}
      </MainPage>
    </>
  );
};

export default Timeline;
