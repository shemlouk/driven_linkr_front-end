import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { SessionContext } from "../../hooks/SessionContext";
import { PublishContext } from "../../hooks/PublishContext";
import WritePost from "../../layouts/WritePostBox/index";
import HashtagContext from "../../hooks/HashtagContext";
import PostCard from "../../components/PostCard/index";
import Header from "../../layouts/Header/index";
import { useNavigate } from "react-router-dom";
import Trending from "../../layouts/Trending";
import ReactModal from "react-modal";
import API from "../../config/api";
import * as P from "./styles";

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
  const { updateList, setUpdateList } = useContext(PublishContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getPosts();
  }, [updateList]);

  async function getPosts() {
    try {
      let res;
      if (!session) {
        res = await API.get(`/timeline`);
      } else {
        res = await API.get(`/timeline`, session.auth);
      }
      console.log(res.data);
      setPostList(res.data);
      setUpdateList(false);
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

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal(id) {
    setIsModalOpen(true);
    setDeletePostId(id);
  }

  async function deletePost(id) {
    setIsDeleting(true);
    try {
      await API.delete(`/user/post/${id}`, session.auth);
      const newPostList = postList.filter((post) => post.id !== id);
      setPostList(newPostList);
    } catch (response) {
      console.error(response);
      alert("An error occurred while trying to delete your post");
    }
    setIsDeleting(false);
    setIsModalOpen(false);
  }

  return (
    <>
      {isDeleting ? (
        <LoadingSpinner />
      ) : (
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
                    <P.SpecialMessage data-test="message">
                      There are no posts yet
                    </P.SpecialMessage>
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
                <button
                  data-test="cancel"
                  className="no-btn"
                  onClick={closeModal}
                >
                  No, go back
                </button>
                <button
                  data-test="confirm"
                  className="yes-btn"
                  onClick={() => deletePost(deletePostId)}
                >
                  Yes, delete it
                </button>
              </div>
            </P.OverlayBox>
          </ReactModal>
        </>
      )}
      ;
    </>
  );
};

export default Timeline;
