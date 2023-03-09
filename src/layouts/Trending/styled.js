import styled from "styled-components";


export const TrendingSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 300px;
    height: fit-content;
    max-height: 430px;
    background-color: #171717;
    margin-left: 18px;
    border-radius: 12px;

    span {
        display: flex;
        box-sizing: border-box;
        padding-left: 16px;
        align-items: center;
        width: 100%;
        height: 60px;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 28px;
        color: #FFFFFF;
        border-bottom: 1px solid #484848;
    }
`;

export const HashtagList = styled.ul`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 24px;
    height: 100%;
    width: 100%
`;

export const HashtagName = styled.li`
    font-size: 19px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    box-sizing: border-box;
    padding-left: 16px;
    color: #FFFFFF;
    margin-bottom: 16px;
    cursor: pointer;

    &:hover {
        color: #c9c9c9;
    }
`;