import styled from "styled-components";

export const PostListing = styled.div`

    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    margin-top: 100px;
`

export const PostBox = styled.div`
    display: flex;
    width: 100%;
    min-width: 375px;
    height: 278px;
    margin-bottom: 16px;
    background-color: #171717;
    border-radius: 16px;
`

export const LeftSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 27px;
        margin: 16px 0;
    }

    div {
        width: 50px;
        font-size: 2em;
        color: #FFFFFF;
        text-align: center;

        p {
            font-size: 11px;
            font-family: "Lato", sans-serif;
            font-weight: 400;
        }
    }
`

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 8px;
`

export const PostUser = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #FFFFFF;
    margin: 16px 0;

    p {
        font-size: 19px;
        font-family: "Lato", sans-serif;
        font-weight: 400;
    }

    div {

        span {
            font-size: 1.2em;
            color: #FFFFFF;
            text-align: center;
            margin-right: 8px;
        }
    }
`

export const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;

    p {
        color: #b7b7b7;
        font-family: "Lato", sans-serif;
        font-weight: 400;

        a {
            font-weight: 700;
            color: #FFFFFF;
        }
    }
`

export const LinkPreview = styled.div`
    display: flex;
    width: 100%;
    border-radius: 12px;
    border: 1px solid #4D4D4D;
    margin-top: 12px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-family: "Lato", sans-serif;
        font-weight: 400;
        box-sizing: border-box;
        padding: 0 12px;

        span {
            font-size: 16px;
            color: #CECECE;
        }

        p {
            font-size: 11px;
            color: #9B9595;
        }
    }

    img {
        width: 155px;
        height: 155px;
        border-radius: 0px 12px 12px 0px;
    }
`