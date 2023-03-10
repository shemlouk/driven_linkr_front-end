import PostContext from "../../../hooks/PostContext.js";
import { IoHeartOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import * as S from "./styles.js";
import { SessionContext } from "../../../hooks/SessionContext.js";

const LeftSide = () => {
  const { profilePicture, profile_picture, likes_count, likes_names } = useContext(PostContext);
  const { session } = useContext(SessionContext);
  const [tooltipText, setTooltipText] = useState("");

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
    <S.Container>
      <img src={profilePicture || profile_picture} />
      <div>
        <IoHeartOutline 
          data-tooltip-id="who-liked" 
          data-tooltip-content={tooltipText} 
          data-tooltip-place="bottom"
          data-test="like-btn"
        />
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
        <p>{`${likes_count || 0} likes`}</p>
      </div>
    </S.Container>
  );
};

export default LeftSide;
