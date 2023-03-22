import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

const ButtonSpinner = ({ bgColor, size, color }) => {
  return (
    <Container bgColor={bgColor || "#ffffff50"}>
      <ThreeDots
        height={size || "80"}
        width={size || "80"}
        radius="9"
        color={color || "#fff"}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
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
  background-color: ${({ bgColor }) => bgColor};
`;

export default ButtonSpinner;
