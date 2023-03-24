import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import HashtagContext from "../../hooks/HashtagContext";
import PostCard from "../../components/PostCard/index";
import { useNavigate } from "react-router-dom";
import Trending from "../../layouts/Trending";
import API from "../../config/api";
import { useInterval } from "@react-hooks-library/core"
import LoadPostBox from "../../components/LoadPostsBox";

const Timeline = () => {
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [allPosts, setAllPosts] = useState([])
  const [hasMorePosts, setHasMorePosts] = useState(false)
  const [newPosts, setNewPosts] = useState([])
  const [postCount, setPostCount] = useState(0)



  async function getPosts() {
    try {
      let res;
      if (!session) {
        res = await API.get(`/timeline?offset=${offset}`);
      } else {
        res = await API.get(`/timeline?offset=${offset}`, session.auth);
      }

      if (res.data.length === 0) {
        setHasMore(false)
      }

      setPostList([...postList, ...res.data]);
      setOffset(offset + 10)
      setIsLoading(false);
    } catch ({ response }) {
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  }

  async function getAllPosts() {
    try {
      let res;
      if (!session) {
        res = await API.get(`/timeline/posts`);
      } else {
        res = await API.get(`/timeline/posts`, session.auth);
      }
      setAllPosts(res.data)
      console.log(res.data.length)
    } catch ({ response }) {
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page."
      );
    }
  }

  useEffect (() => {
    getAllPosts()
  }, [])
  
  useInterval(checkNewPosts, 15000)

  async function checkNewPosts() {
    try {
      let res;
      if (!session) {
        res = await API.get(`/timeline/posts`);
      } else {
        res = await API.get(`/timeline/posts`, session.auth);
      }
      setNewPosts(res.data)

      if(newPosts.length > allPosts.length) {
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
    setOffset(0)
    setPostList([])
    setIsLoading(true)
    setHasMorePosts(false)
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
                <InfiniteScroll
                  key={offset}
                  pageStart={0}
                  loadMore={getPosts}
                  hasMore={hasMore}
                  loader={<P.SpecialMessage>Loading...</P.SpecialMessage>}
                >
                  {session ?
                    <WritePost
                      checkNewPosts={checkNewPosts}
                    />
                  : null}
                  {hasMorePosts ? 
                  <LoadPostBox
                    refreshPostList={refreshPostList}
                    newPosts={postCount}
                  /> 
                : null}
                  <P.PostListing>
                    {isLoading ? (
                      <></>
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
                </InfiniteScroll>
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
