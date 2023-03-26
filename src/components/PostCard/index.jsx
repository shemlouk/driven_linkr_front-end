import { SessionContext } from "../../hooks/SessionContext";
import PostContext from "../../hooks/PostContext";
import { useContext, useState } from "react";
import RightSide from "./RightSide/index";
import { BiRepost } from "react-icons/bi";
import LeftSide from "./LeftSide/index";
import CommentSection from "./Comments";
import { Link } from "react-router-dom";
import * as S from "./styles";

const PostCard = (props) => {
  const [numberComments, setNumberComments] = useState(props.num_comments);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const {
    session: { user },
  } = useContext(SessionContext);

  const isRepost = props.rb_user_id && true;

  return (
    <PostContext.Provider value={props}>
      <S.Post {...{ isRepost }}>
        {isRepost && (
          <S.RepostSign>
            <div>
              <BiRepost />
              Reposted by
              <Link to={`/user/${props.rb_user_id}`}>
                {props.rb_user_id === user.id ? "you" : props.rb_user_name}
              </Link>
            </div>
          </S.RepostSign>
        )}
        <S.Container data-test="post">
          <LeftSide
            showComments={showComments}
            setShowComments={setShowComments}
            numberComments={numberComments}
            numberReposts={props.num_reposts}
          />
          <RightSide />
        </S.Container>
        <CommentSection
          showComments={showComments}
          commentsList={commentsList}
          setCommentsList={setCommentsList}
          setNumberComments={setNumberComments}
        />
      </S.Post>
    </PostContext.Provider>
  );
};

export default PostCard;
