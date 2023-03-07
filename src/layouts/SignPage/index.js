import * as S from "./styles";

const SignPage = ({ children }) => {
  return (
    <S.Container>
      <S.Banner>
        <h1>linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </S.Banner>
      <S.FormContainer>{children}</S.FormContainer>
    </S.Container>
  );
};

export default SignPage;
