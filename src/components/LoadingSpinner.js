import { RotatingSquare } from "react-loader-spinner";
import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <Container>
      <RotatingSquare
        height="300"
        width="300"
        color="#fff"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p>LOADING</p>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: var(--black);
  p {
    margin-top: 20px;
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 50px;
    font-weight: 300;
    letter-spacing: 5px;
  }
`;

export default LoadingSpinner;
