import LoadingCommentsSpinner from "../../LoadingCommentsSpinner.jsx";
import { SessionContext } from "../../../hooks/SessionContext.jsx";
import PostContext from "../../../hooks/PostContext.jsx";
import { useContext, useEffect, useState } from "react";
import API from "../../../config/api.js";
import { BsSend } from "react-icons/bs";
import * as S from "./styles.js";
import Joi from "joi";
import { Oval } from "react-loader-spinner";

const schema = Joi.object({
  message: Joi.string().min(1).required(),
  post_id: Joi.number().positive().integer().required(),
});

export default function CommentSection(props) {
  const { showComments, commentsList, setCommentsList, setNumberComments } =
    props;
  const { num_comments, id, user_id } = useContext(PostContext);
  const [sendingComment, setSendingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useContext(SessionContext);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (showComments && num_comments) {
      searchComments();
    }
  }, [showComments]);

  async function submit() {
    try {
      setSendingComment(true);
      const data = { message: comment, post_id: id };
      const { error } = schema.validate(data);
      if (error) {
        setSendingComment(false);
        return;
      }

      await API.post("/comment", data, session.auth);

      setNumberComments(commentsList.length + 1);
      setCommentsList([
        ...commentsList,
        {
          id: session.user.id,
          name: session.user.name,
          profile_picture: session.user.profilePicture,
          user_id: session.user.id,
          ...data,
        },
      ]);
      setComment("");
      setSendingComment(false);
    } catch ({ response }) {
      console.log(response);
      setSendingComment(false);
    }
  }

  async function searchComments() {
    try {
      setIsLoading(true);
      const res = (await API.get(`/post/${id}/comments`, session.auth)).data;
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

    if (session.user.network.includes(comment.user_id)) status = " • following";
    if (comment.user_id === user_id) status = " • post’s author";

    return status;
  }

  return (
    <S.Container isVisible={showComments} data-test="comment-box">
      {showComments && (
        <S.List>
          {isLoading ? (
            <S.Comment>
              <LoadingCommentsSpinner />
            </S.Comment>
          ) : (
            commentsList.map((c, i) => {
              return (
                <S.Comment key={i} data-test="comment">
                  <S.UserPicture src={c.profile_picture} />
                  <S.MessageContainer>
                    <div>
                      <S.UserName>{c.name}</S.UserName>
                      <S.UserStatus>{returnStatusText(c)}</S.UserStatus>
                    </div>
                    <S.Message>{c.message}</S.Message>
                  </S.MessageContainer>
                </S.Comment>
              );
            })
          )}
          <S.Comment>
            <S.UserPicture src={session.user.profilePicture} />
            <S.InputContainer>
              <S.Input
                data-test="comment-input"
                type="text"
                placeholder="write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {sendingComment ? (
                <Oval
                  height={19}
                  width={19}
                  color="#fff"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#565656"
                  strokeWidth={2}
                  strokeWidthSecondary={4}
                />
              ) : (
                <BsSend data-test="comment-submit" onClick={submit} />
              )}
            </S.InputContainer>
          </S.Comment>
        </S.List>
      )}
    </S.Container>
  );
}
