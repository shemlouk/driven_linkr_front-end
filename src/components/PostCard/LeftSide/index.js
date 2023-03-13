import { SessionContext } from "../../../hooks/SessionContext.js";
import { API_URL } from "../../../utils/constants/index.js";
import { useCallback, useContext, useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext.js";
import * as S from "./styles.js";
import axios from "axios";

const LeftSide = () => {
  const { profilePicture, profile_picture, likes_count, likes_names, id } =
    useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [numberLikes, setNumberLikes] = useState(Number(likes_count) || 0);
  const { session } = useContext(SessionContext);
  const [isLiked, setIsLiked] = useState(likes_names?.includes(session.user.name));

  const updateLike = useCallback(async () => {
    if (isLoading) return;
    setIsLiked(!isLiked);
    setNumberLikes(isLiked ? numberLikes - 1 : numberLikes + 1);
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/timeline/${id}/like`, {}, session.auth);
      setIsLoading(false);
    } catch ({ response }) {
      console.error(response);
    }
  }, [isLiked, isLoading]);

  return (
    <S.Container {...{ isLiked }}>
      <img src={profilePicture || profile_picture} />
      <div>
        {isLiked ? (
          <IoHeart onClick={updateLike} />
        ) : (
          <IoHeartOutline onClick={updateLike} />
        )}
        <p>{numberLikes} likes</p>
      </div>
    </S.Container>
  );
};

export default LeftSide;
