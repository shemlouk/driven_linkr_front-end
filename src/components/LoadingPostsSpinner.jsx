import { MutatingDots } from "react-loader-spinner";
import styled from "styled-components";

const LoadingPostsSpinner = () => {
  return (
    <Container>
      <MutatingDots
        height="100"
        width="100"
        color="#fff"
        secondaryColor="#eee"
        radius="14"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoadingPostsSpinner;
