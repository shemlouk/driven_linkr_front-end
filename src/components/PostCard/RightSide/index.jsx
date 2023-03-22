import { SessionContext } from "../../../hooks/SessionContext";
import { IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext";
import LinkPreview from "../../LinkPreview/index";
import { ReactTagify } from "react-tagify";
import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import * as S from "./styles";
import API from "../../../config/api";

const RightSide = () => {
  const { id, user_id, name, description, openModal, selectHashtag } =
    useContext(PostContext);
  const { isLoggedIn, session } = useContext(SessionContext);
  const [isEditing, setIsEditing] = useState(false)
  const [descInput, setDescInput] = useState(description)
  const [isLoading, setIsLoading] = useState(false)
  const descRef = useRef(null)

  function startEdit() {
    setIsEditing(true)
  }

  function cancelEdit() {
    setDescInput(description)
    setIsEditing(false)
  }

  async function finishEdit(e) {
    if (e.key === "Enter") {
      setIsLoading(true)
      try {
        console.log({ description: descInput })
        await API.put(`/user/post/${id}`, { description: descInput }, session.auth);
        setIsEditing(false)
      } catch (response) {
        console.error(response);
        alert("An error occurred while trying to edit your post");
      }
      setIsLoading(false)
    }
    if (e.key === "Escape") {
      cancelEdit()
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
            <span data-test="edit-btn" onClick={() => isEditing ? cancelEdit() : startEdit()}>
              <IoPencilSharp />
            </span>
            <span data-test="delete-btn" onClick={() => openModal(id)}>
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
            <p data-test="description">{description}</p>
          </ReactTagify>
        )}
        <LinkPreview />
      </S.PostContent>
    </S.Container>
  );
};

export default RightSide;
