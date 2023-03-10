import PostContext from "../../hooks/PostContext.js";
import RightSide from "./RightSide/index.js";
import LeftSide from "./LeftSide/index.js";
import * as S from "./styles.js";

const PostCard = (props) => {
  return (
    <PostContext.Provider value={props}>
      <S.Container data-test="post">
        <LeftSide />
        <RightSide />
      </S.Container>
    </PostContext.Provider>
  );
};

export default PostCard;
