import { SessionContext } from "../../../hooks/SessionContext";
import { IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext";
import LinkPreview from "../../LinkPreview/index";
import { ReactTagify } from "react-tagify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import * as S from "./styles";

const RightSide = () => {
  const { id, user_id, name, description, openModal, selectHashtag } =
    useContext(PostContext);
  const { isLoggedIn, session } = useContext(SessionContext);

  return (
    <S.Container>
      <S.PostUser>
        <Link to={`/user/${user_id}`}>
          <p data-test="username">{name}</p>
        </Link>
        {isLoggedIn && session.user.id === user_id ? (
          <div>
            <span data-test="edit-btn">
              <IoPencilSharp />
            </span>
            <span data-test="delete-btn" onClick={() => openModal(id)}>
              <IoTrashOutline />
            </span>
          </div>
        ) : null}
      </S.PostUser>
      <S.PostContent>
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
        <LinkPreview />
      </S.PostContent>
    </S.Container>
  );
};

export default RightSide;
