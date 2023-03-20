import PostContext from "../../hooks/PostContext";
import RightSide from "./RightSide/index";
import LeftSide from "./LeftSide/index";
import * as S from "./styles";

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
