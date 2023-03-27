import React, { useState, useEffect, useContext, useCallback } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { useParams, useNavigate } from "react-router-dom";
import HashtagContext from "../../hooks/HashtagContext";
import { ModalContext } from "../../hooks/ModalContext";
import PostCard from "../../components/PostCard/index";
import MainPage from "../../layouts/MainPage/index";
import API from "../../config/api";

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setHashtag } = useContext(HashtagContext);
  const { session } = useContext(SessionContext);
  const { idDeleted } = useContext(ModalContext);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await API.get(`/user/${id}`, session.auth);
      setPostList(data.posts);
      setIsLoading(false);
      setUser({
        username: data.name,
        profilePicture: data.profile_picture,
      });
    } catch ({ response }) {
      console.error(response);
      setIsLoading(false);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  });

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
    if (!session) {
      navigate("/timeline");
      return;
    }
    getUserPosts();
  }, [id]);

  useEffect(() => {
    const newPostList = postList.filter((post) => post.id !== idDeleted);
    setPostList(newPostList);
  }, [idDeleted]);

  return (
    <MainPage
      postsAreLoading={isLoading}
      loadMoreFunction={getUserPosts}
      profilePicture={user.profilePicture}
      title={user && user.username + "' posts"}
    >
      {postList.length > 0 &&
        postList.map((post) => (
          <PostCard key={post.id} {...{ ...post, selectHashtag }} />
        ))}
    </MainPage>
  );
};

export default UserPage;
