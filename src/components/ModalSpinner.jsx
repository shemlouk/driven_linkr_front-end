import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const ModalSpinner = () => {
  return (
    <Container>
      <Oval
        height={100}
        width={100}
        color="#fff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#fff"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
`;

export default ModalSpinner;
