import { SessionContext } from "../../hooks/SessionContext";
import HashtagContext from "../../hooks/HashtagContext";
import PostCard from "../../components/PostCard/index";
import React, { useState, useContext } from "react";
import MainPage from "../../layouts/MainPage/index";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import API from "../../config/api";

const Timeline = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);
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

  function openDeleteModal(id) {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setDeletePostId(id);
  }

  async function deletePost(postId) {
    try {
      await API.delete(`/user/post/${postId}`, session.auth);
      const newPostList = postList.filter((post) => post.id !== postId);
      setPostList(newPostList);
    } catch ({ response }) {
      console.error(response);
      alert("An error occurred while trying to delete your post");
    }
  }

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
            <PostCard
              key={post.id}
              {...{ ...post, openDeleteModal, selectHashtag }}
            />
          ))}
      </MainPage>
      <Modal
        id={deletePostId}
        toggle={isDeleteModalOpen}
        cancelButtonText="No, go back"
        approveButtonText="Yes, delete it"
        approveButtonFunction={deletePost}
        modalText="Are you sure you want to delete this post?"
      />
    </>
  );
};

export default Timeline;
