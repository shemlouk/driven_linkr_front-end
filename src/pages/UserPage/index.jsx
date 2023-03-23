import React, { useState, useEffect, useContext, useCallback } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/index";
import MainPage from "../../layouts/MainPage/index";
import API from "../../config/api";

const UserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getUserPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await API.get(`/user/${id}`, session.auth);
      setPostList(res.data);
      setUser({
        username: res.data[0].name,
        profilePicture: res.data[0].profile_picture,
      });
      setIsLoading(false);
    } catch ({ response }) {
      setIsLoading(false);
      console.error(response);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  });

  useEffect(() => {
    if (!session) {
      navigate("/timeline");
      return;
    }
    window.scrollTo(0, 0);
    getUserPosts();
  }, [id]);

  return (
    <MainPage
      title={user && user.username + "' posts"}
      profilePicture={user.profilePicture}
      postsAreLoading={isLoading}
    >
      {postList.length > 0 &&
        postList.map((post) => <PostCard key={post.id} {...post} />)}
    </MainPage>
  );
};

export default UserPage;
