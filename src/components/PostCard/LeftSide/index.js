import { SessionContext } from "../../../hooks/SessionContext.js";
import { API_URL } from "../../../utils/constants/index.js";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext.js";
import * as S from "./styles.js";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import "../../../assets/tooltip.css";

const LeftSide = () => {
  const { profilePicture, profile_picture, likes_count, likes_names, id } =
    useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [numberLikes, setNumberLikes] = useState(Number(likes_count) || 0);
  const [tooltipText, setTooltipText] = useState("");
  const { session } = useContext(SessionContext);
  const [isLiked, setIsLiked] = useState(likes_names?.includes(session.user.name));

  const updateLike = useCallback(async () => {
    if (isLoading) return;
    setIsLiked(!isLiked);
    setNumberLikes(isLiked ? numberLikes - 1 : numberLikes + 1);
    setIsLoading(true);
    loadTooltipText();
    try {
      await axios.post(`${API_URL}/timeline/${id}/like`, {}, session.auth);
      setIsLoading(false);
    } catch ({ response }) {
      console.error(response);
    }
  }, [isLiked, isLoading]);

  function loadTooltipText() {
    const names = likes_names?.split(",");
    let text = "";

    switch (numberLikes) {
      case 0:
        setTooltipText("");
        break;
      case 1:
        setTooltipText(isLiked? "Você" : likes_names);
        break;
      case 2:
        isLiked ? text = `Você e ${names.find((n) => n !== session.user.name)}` : text = `${names[0]} e ${names[1]}`;
        setTooltipText(text);
        break;
      default:
        isLiked ? text = `Você, ${names.find((n) => n !== session.user.name)} e outras ${numberLikes - 2} pessoas` : text = `${names[0]}, ${names[1]} e outras ${numberLikes - 2} pessoas`;
        setTooltipText(text);
        break;
    }
  }

  useEffect(() => {
    loadTooltipText();
  }, [isLiked]);

  return (
    <S.Container {...{ isLiked }}>
      <img src={profilePicture || profile_picture} />
      <div>
        {isLiked ? (
          <IoHeart onClick={updateLike}
          data-tooltip-id="who-liked"
          data-tooltip-content={tooltipText}
          data-tooltip-place="bottom"
          />
        ) : (
          <IoHeartOutline onClick={updateLike}
          data-tooltip-id="who-liked"
          data-tooltip-content={tooltipText}
          data-tooltip-place="bottom"
          />
        )}
        <p>{numberLikes} likes</p>
        <Tooltip id="who-liked"
          className="tooltip-two"
          classNameArrow="tooltip-arrow"
        />
      </div>
    </S.Container>
  );
};

export default LeftSide;
