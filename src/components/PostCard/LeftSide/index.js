import PostContext from "../../../hooks/PostContext.js";
import { IoHeartOutline } from "react-icons/io5";
import { useContext } from "react";
import * as S from "./styles.js";

const LeftSide = () => {
  const { profilePicture, profile_picture, likes_count } = useContext(PostContext);
  return (
    <S.Container>
      <img src={profilePicture || profile_picture} />
      <div>
        <IoHeartOutline />
        <p>{`${likes_count || 0} likes`}</p>
      </div>
    </S.Container>
  );
};

export default LeftSide;
