import { SessionContext } from "../../../hooks/SessionContext.jsx";
import { BsSend } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import * as S from "./styles.js";
import PostContext from "../../../hooks/PostContext.jsx";
import api from "../../../config/api.js";
import LoadingCommentsSpinner from "../../LoadingCommentsSpinner.jsx";

export default function CommentSection({showComments}) {
  const { num_comments, id, user_id } = useContext(PostContext);
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    if(showComments && num_comments) {
      searchComments();
    }
  }, [showComments]);

  async function searchComments() {
    try {
      setIsLoading(true);
      const res = (await api.get(`/post/${id}/comments`, session.auth)).data;
      console.log(res);
      setCommentsList(res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  function returnStatusText(comment) {
    let status = "";

    if(session.user.network.includes(comment.name)) status = " • following";
    if(comment.user_id === user_id) status = " • post’s author";

    return status;
  }

  return (
    <S.Container isVisible={showComments}>
      {showComments && 
      <S.List>
        {
          isLoading? 
          <S.Comment>
            <LoadingCommentsSpinner />
          </S.Comment>
          :
          commentsList.map((c) => {
            return (<S.Comment key={c.id}>
              <S.UserPicture src={c.profile_picture} />
              <S.MessageContainer>
                <div>
                  <S.UserName>{c.name}</S.UserName>
                  <S.UserStatus>{returnStatusText(c)}</S.UserStatus>
                </div>
                <S.Message>{c.message}</S.Message>
              </S.MessageContainer>
            </S.Comment>)
          })
        }
        <S.Comment>
          <S.UserPicture src={session.user.profilePicture} />
          <S.InputContainer>
            <S.Input placeholder="write a comment..." />
            <BsSend />
          </S.InputContainer>
        </S.Comment>
      </S.List>}
    </S.Container>
  );
}