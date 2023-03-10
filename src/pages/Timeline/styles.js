import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    margin-top: 125px;
`

export const TitleBox = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 43px;
    color: #FFFFFF;
    margin-bottom: 42px;
`

export const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

`

export const PostWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const PostListing = styled.div`
    display: flex;
    flex-direction: column;
`

export const PostBox = styled.div`
    display: flex;
    max-width: 700px;
    min-width: 500px;
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
    justify-content: space-between;

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

export const SideMenu = styled.div`
    min-width: 300px;
    height: 400px;
    background-color: #171717;
    margin-left: 18px;
    border-radius: 12px;

    p {
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

    ul {
        font-size: 19px;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        box-sizing: border-box;
        padding-left: 16px;
        color: #FFFFFF;
        margin-top: 24px;

        li {
            margin-bottom: 16px;
        }
    }
`

export const SpecialMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 32px;
    color: white;
    letter-spacing: 0.1em;
`

export const ImageCover = styled.img`
    object-fit: cover;
`

export const OverlayBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
        font-size: 34px;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        color: #FFFFFF;
        margin: auto;
        text-align: center;
    }

    div {
        width: 70%;
        display: flex;
        justify-content: space-between;
        margin: 30px auto;


        button {
            width: 135px;
            height: 37px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-family: "Lato", sans-serif;
            font-weight: 700;

            &.yes-btn {
                background-color: #1877F2;
                color: #FFFFFF;
            }

            &.no-btn {
                background-color: #FFFFFF;
                color: #1877F2;
            }
        }
    }
`

