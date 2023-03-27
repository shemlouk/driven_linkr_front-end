import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-top: 40px;
    margin-bottom: 20px;

    p {
        font-size: 18px;
        font-family: "Lato", sans-serif;
        font-weight: 400;
        color: #FFFFFF;

        svg {
            width: 36px;
            color: #FFFFFF;
        }
    }
`