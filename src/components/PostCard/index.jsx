import PostContext from "../../hooks/PostContext";
import RightSide from "./RightSide/index";
import LeftSide from "./LeftSide/index";
import * as S from "./styles";
import CommentSection from "./Comments";
import { useState } from "react";

const PostCard = (props) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <PostContext.Provider value={props}>
      <S.Post>
        <S.Container data-test="post">
          <LeftSide showComments={showComments} setShowComments={setShowComments} />
          <RightSide />
        </S.Container>
        <CommentSection showComments={showComments} />
      </S.Post>
    </PostContext.Provider>
  );
};

export default PostCard;
