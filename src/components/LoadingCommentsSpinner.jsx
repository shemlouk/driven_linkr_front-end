import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const LoadingCommentsSpinner = () => {
  return (
    <Container>
      <ThreeDots
        height="20"
        width="80"
        radius="9"
        color="#919191"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default LoadingCommentsSpinner;
