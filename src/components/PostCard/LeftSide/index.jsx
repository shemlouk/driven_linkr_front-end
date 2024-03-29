import { useCallback, useContext, useState, useEffect } from "react";
import { SessionContext } from "../../../hooks/SessionContext";
import { ModalContext } from "../../../hooks/ModalContext";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext";
import { AiOutlineComment } from "react-icons/ai";
import "react-tooltip/dist/react-tooltip.css";
import { BiRepost } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import API from "../../../config/api";
import "../../../assets/tooltip.css";
import * as S from "./styles";

const LeftSide = ({
  setShowComments,
  numberComments,
  numberReposts,
  showComments,
}) => {
  const { profilePicture, profile_picture, likes_count, likes_names, id } =
    useContext(PostContext);
  const [numberLikes, setNumberLikes] = useState(Number(likes_count) || 0);
  const [tooltipText, setTooltipText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useContext(ModalContext);
  const { session } = useContext(SessionContext);
  const [isLiked, setIsLiked] = useState(
    likes_names?.includes(session.user.name)
  );

  const updateLike = useCallback(async () => {
    if (isLoading) return;
    setIsLiked(!isLiked);
    setNumberLikes(isLiked ? numberLikes - 1 : numberLikes + 1);
    setIsLoading(true);
    loadTooltipText();
    try {
      await API.post(`/timeline/${id}/like`, {}, session.auth);
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
        setTooltipText(isLiked ? "Você" : likes_names);
        break;
      case 2:
        isLiked
          ? (text = `Você e ${names.find((n) => n !== session.user.name)}`)
          : (text = `${names[0]} e ${names[1]}`);
        setTooltipText(text);
        break;
      default:
        isLiked
          ? (text = `Você, ${names.find(
              (n) => n !== session.user.name
            )} e outras ${numberLikes - 2} pessoas`)
          : (text = `${names[0]}, ${names[1]} e outras ${
              numberLikes - 2
            } pessoas`);
        setTooltipText(text);
        break;
    }
  }

  useEffect(() => {
    loadTooltipText();
  }, [isLiked]);

  return (
    <S.Container>
      <img src={profilePicture || profile_picture} />
      <S.ButtonsContainer {...{ isLiked }}>
        <div>
          {isLiked ? (
            <IoHeart onClick={updateLike} className="heart" />
          ) : (
            <IoHeartOutline onClick={updateLike} />
          )}
          <p
            data-tooltip-id="who-liked"
            data-tooltip-content={tooltipText}
            data-tooltip-place="bottom"
          >
            {numberLikes} likes
          </p>
          <Tooltip
            id="who-liked"
            className="tooltip-two"
            classNameArrow="tooltip-arrow"
          />
        </div>
        <div>
          <AiOutlineComment
            data-test="comment-btn"
            onClick={() => {
              setShowComments(!showComments);
            }}
          />
          <p data-test="comment-counter">{`${numberComments || 0} comments`}</p>
        </div>
        <div>
          <BiRepost
            data-test="repost-btn"
            onClick={() => openModal(id, "repost")}
          />
          <p data-test="repost-counter">{`${numberReposts || 0} re-posts`}</p>
        </div>
      </S.ButtonsContainer>
    </S.Container>
  );
};

export default LeftSide;
