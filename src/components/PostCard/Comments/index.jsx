import { SessionContext } from "../../../hooks/SessionContext.jsx";
import { BsSend } from "react-icons/bs";
import { useContext } from "react";
import * as S from "./styles.js";

export default function CommentSection({showComments}) {
  const { session } = useContext(SessionContext);
  
  return (
    <S.Container isVisible={showComments}>
      {showComments && <S.List>
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