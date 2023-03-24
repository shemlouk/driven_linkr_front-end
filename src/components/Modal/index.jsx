import { useEffect, useState } from "react";
import ModalSpinner from "../ModalSpinner";
import ReactModal from "react-modal";
import * as S from "./styles";

ReactModal.setAppElement("#root");

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

const Modal = ({
  approveButtonFunction,
  approveButtonText,
  cancelButtonText,
  modalText,
  toggle,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  async function submitHandler(postId) {
    setIsLoading(true);
    await approveButtonFunction(postId);
    setIsLoading(false);
    closeModal();
  }

  useEffect(() => {
    if (!id) return;
    setIsModalOpen(true);
  }, [toggle]);

  return (
    <ReactModal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    >
      {isLoading ? (
        <ModalSpinner />
      ) : (
        <S.OverlayBox>
          <p>{modalText}</p>
          <div>
            <button data-test="cancel" className="no-btn" onClick={closeModal}>
              {cancelButtonText}
            </button>
            <button
              data-test="confirm"
              className="yes-btn"
              onClick={() => submitHandler(id)}
            >
              {approveButtonText}
            </button>
          </div>
        </S.OverlayBox>
      )}
    </ReactModal>
  );
};

export default Modal;
