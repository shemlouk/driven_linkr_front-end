import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/index";
import MainPage from "../../layouts/MainPage/index";
import API from "../../config/api";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { session } = useContext(SessionContext);

  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!session) {
      return navigate("/timeline");
    }

    async function getUserPosts() {
      try {
        const res = await API.get(`/user/${id}`, session.auth);
        setPostList(res.data);
        setUsername(res.data[0].name);
        setIsLoading(false);
      } catch ({ response }) {
        console.error(response);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page."
        );
      }
    }
    getUserPosts();
  }, []);

  return (
    <MainPage title={username && username + "' posts"} {...{ isLoading }}>
      {postList.length > 0 &&
        postList.map((post) => <PostCard key={post.id} {...post} />)}
    </MainPage>
  );
};

export default UserPage;
