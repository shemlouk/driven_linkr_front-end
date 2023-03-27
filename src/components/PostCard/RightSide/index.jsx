import { IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import { SessionContext } from "../../../hooks/SessionContext";
import { ModalContext } from "../../../hooks/ModalContext";
import { useContext, useState, useRef } from "react";
import PostContext from "../../../hooks/PostContext";
import LinkPreview from "../../LinkPreview/index";
import { ReactTagify } from "react-tagify";
import { Link } from "react-router-dom";
import API from "../../../config/api";
import * as S from "./styles";

const RightSide = () => {
  const { id, user_id, name, description, selectHashtag } =
    useContext(PostContext);
  const { isLoggedIn, session } = useContext(SessionContext);
  const [descInput, setDescInput] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { openModal } = useContext(ModalContext);
  const descRef = useRef(null);

  function startEdit() {
    setIsEditing(true);
  }

  function cancelEdit() {
    setDescInput(description);
    setIsEditing(false);
  }

  async function finishEdit(e) {
    if (e.key === "Enter") {
      setIsLoading(true);
      try {
        await API.put(
          `/user/post/${id}`,
          { description: descInput },
          session.auth
        );
        setDescInput(descRef.current.value);
        setIsEditing(false);
      } catch (response) {
        console.error(response);
        alert("An error occurred while trying to edit your post");
      }
      setIsLoading(false);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  }

  return (
    <S.Container>
      <S.PostUser>
        <Link to={`/user/${user_id}`}>
          <p data-test="username">{name}</p>
        </Link>
        {isLoggedIn && session.user.id === user_id ? (
          <div>
            <span
              data-test="edit-btn"
              onClick={() => (isEditing ? cancelEdit() : startEdit())}
            >
              <IoPencilSharp />
            </span>
            <span
              data-test="delete-btn"
              onClick={() => openModal(id, "delete")}
            >
              <IoTrashOutline />
            </span>
          </div>
        ) : null}
      </S.PostUser>
      <S.PostContent>
        {isEditing ? (
          <input
            data-test="edit-input"
            ref={descRef}
            onKeyDown={finishEdit}
            onChange={(e) => setDescInput(e.target.value)}
            value={descInput}
            type="text"
            disabled={isLoading}
          />
        ) : (
          <ReactTagify
            tagStyle={{
              fontWeight: 700,
              color: "white",
              cursor: "pointer",
            }}
            tagClicked={(tag) => selectHashtag(tag)}
          >
            <p data-test="description">{descInput}</p>
          </ReactTagify>
        )}
        <LinkPreview />
      </S.PostContent>
    </S.Container>
  );
};

export default RightSide;
