import { createContext, useContext, useState } from "react";
import { SessionContext } from "./SessionContext";
import Modal from "../components/Modal";
import API from "../config/api";

export const ModalContext = createContext({
  openModal: () => {},
});

export const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("delete");
  const [idDeleted, setIdDeleted] = useState(null);
  const { session } = useContext(SessionContext);
  const [postId, setPostId] = useState(null);

  const openModal = (id, mode) => {
    setIsModalOpen(!isModalOpen);
    setModalMode(mode);
    setPostId(id);
  };

  const repostPost = () => {
    alert("teste repost");
  };

  async function deletePost(postId) {
    try {
      await API.delete(`/user/post/${postId}`, session.auth);
      setIdDeleted(postId);
    } catch ({ response }) {
      console.error(response);
      alert("An error occurred while trying to delete your post");
    }
  }

  const modalInfo =
    modalMode === "delete"
      ? {
          modalText: "Are you sure you want to delete this post?",
          approveButtonText: "Yes, delete it",
          cancelButtonText: "No, go back",
          approveButtonFunction: deletePost,
        }
      : {
          modalText: "Do you want to re-post this link?",
          approveButtonText: "Yes, share!",
          cancelButtonText: "No, cancel",
          approveButtonFunction: repostPost,
        };

  return (
    <ModalContext.Provider value={{ openModal, idDeleted }}>
      {children}
      <Modal {...modalInfo} toggle={isModalOpen} id={postId} />
    </ModalContext.Provider>
  );
};
