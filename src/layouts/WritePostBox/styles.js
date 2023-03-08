import styled from "styled-components"

export const WritePostBox = styled.div`
    display: flex;
    max-width: 700px;
    min-width: 500px;
    height: 210px;
    margin-bottom: 30px;
    background-color: #FFFFFF;
    border-radius: 16px;
`

export const LoggedUser = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 27px;
        margin: 16px auto;
    }
`

export const PublishForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    p {
        color: #707070;
        font-family: "Lato", sans-serif;
        font-weight: 300;
        font-size: 20px;
        margin: 20px 0;
    }

    input {
        width: 90%;
        margin-bottom: 8px;
        background-color:#EFEFEF;

        &.url-input {
            width: 90%;
            height: 30px;
            margin-bottom: 8px;
        }

        &.desc-input {
            width: 90%;
            height: 66px;
            margin-bottom: 8px;
        }
    } 

    button {
        width: 130px;
        height: 30px;
        background-color: #1877F2;
        color: #FFFFFF;
        border-radius: 8px;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        align-self: flex-end;
        margin-right: 32px;
    }
`