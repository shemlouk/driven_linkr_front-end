import { SessionContext } from "../../../hooks/SessionContext.js";
import { API_URL } from "../../../utils/constants/index.js";
import { useCallback, useContext, useEffect, useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import PostContext from "../../../hooks/PostContext.js";
import axios from "axios";
import { Tooltip } from 'react-tooltip';
import * as S from "./styles.js";

const LeftSide = () => {
  const { profilePicture, profile_picture, likes_count, likes_names, id } = useContext(PostContext);
  const { session } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
   const [isLiked, setIsLiked] = useState(false);


const LeftSide = () => {
  

  const updateLike = useCallback(async () => {
    if (isLoading) return;
    setIsLiked(!isLiked);
    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/timeline/${id}/like`, {}, session.auth);
      setIsLoading(false);
    } catch ({ response }) {
      console.error(response);
    }
  }, [isLiked, isLoading]);


  useEffect(() => {
    createTooltipText();
  }, []);

  function createTooltipText() {
    if (!likes_names) return;

    const namesArray = likes_names.split(",");
    console.log(namesArray.length);

    switch (namesArray.length) {
      case 1:
        setTooltipText(namesArray[0]);
        break;
      default:
        if (likes_names.includes(session.user.name)) {
          setTooltipText(`Você e ${namesArray[0]}`)
        }else{
          setTooltipText(`${namesArray[0]} e ${namesArray[1]}`);
        }
        break;
    }


  }


  return (
    <S.Container {...{ isLiked }}>
      <img src={profilePicture || profile_picture} />
      <div>
        {isLiked ? (
          <IoHeart 
          data-tooltip-id="who-liked" 
          data-tooltip-content={tooltipText} 
          data-tooltip-place="bottom"
          data-test="like-btn"
          onClick={updateLike} />
        ) : (
          <IoHeartOutline 
          data-tooltip-id="who-liked" 
          data-tooltip-content={tooltipText} 
          data-tooltip-place="bottom"
          data-test="like-btn"
          onClick={updateLike} />
        )}
        <Tooltip id="who-liked" 
          style={{
            fontFamily: "Lato, sans-serif",
            fontSize: "11px",
            color: "#505050",
            backgroundColor: "white",
            width: "auto",
            height: "auto",
          }}
          className="example"
          classNameArrow="arrow"
        />
        <p>{isLiked ? (likes_count ?? 0) + 1 : likes_count} likes</p>
      </div>
    </S.Container>
  );
};

export default LeftSide;
