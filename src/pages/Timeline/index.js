import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import PostCard from "../../components/PostCard/index.js";
import WritePost from "../../layouts/WritePostBox/index";
import HashtagContext from "../../hooks/HashtagContext";
import Header from "../../layouts/Header/index";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import Trending from "../../layouts/Trending";
import ReactModal from "react-modal";
import * as P from "./styles";
import axios from "axios";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 5,
    display: "flex",
  },
  content: {
    display: "flex",
    width: "600px",
    height: "262px",
    backgroundColor: "#333333",
    borderRadius: "50px",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
};

ReactModal.setAppElement("#root");

const Timeline = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      let res;
      if (!session) {
        res = await axios.get(`${API_URL}/timeline`);
      } else {
        res = await axios.get(`${API_URL}/timeline`, session.auth);
      }
      setPostList(res.data);
      setIsLoading(false);
    } catch ({ response }) {
      console.error(response);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  }

  async function selectHashtag(hashtag) {
    hashtag = hashtag.replace("#", "");

    try {
      const res = (
        await axios.get(`${API_URL}/hashtag/search/${hashtag}`, session.auth)
      ).data;
      setHashtag({
        ...res,
      });
      navigate(`/hashtag/${hashtag}`);
    } catch (error) {
      console.error(`selectHashtag: ${error}`);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal(id) {
    setIsModalOpen(true);
    setDeletePostId(id);
  }

  async function deletePost(id) {
    try {
      await axios.delete(`${API_URL}/user/post/${id}`, session.auth);
      const newPostList = postList.filter((post) => post.id !== id);
      setPostList(newPostList);
      setIsModalOpen(false);
    } catch (response) {
      console.error(response);
    }
  }

  return (
    <>
      <Header />
      <P.PageContainer>
        <P.TitleBox>timeline</P.TitleBox>
        <P.ContentWrapper>
          <P.PostWrapper>
            {session ? <WritePost getPosts={getPosts} /> : null}
            <P.PostListing>
              {isLoading ? (
                <P.SpecialMessage>Loading...</P.SpecialMessage>
              ) : postList.length > 0 ? (
                postList.map((post) => (
                  <PostCard
                    key={post.id}
                    {...{ ...post, openModal, selectHashtag }}
                  />
                ))
              ) : (
                <P.SpecialMessage>There are no posts yet.</P.SpecialMessage>
              )}
            </P.PostListing>
          </P.PostWrapper>
          {session ? <Trending /> : null}
        </P.ContentWrapper>
      </P.PageContainer>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <P.OverlayBox>
          <p>Are you sure you want to delete this post?</p>
          <div>
            <button className="no-btn" onClick={closeModal}>
              No, go back
            </button>
            <button
              className="yes-btn"
              onClick={() => deletePost(deletePostId)}
            >
              Yes, delete it
            </button>
          </div>
        </P.OverlayBox>
      </ReactModal>
    </>
  );
};

export default Timeline;
