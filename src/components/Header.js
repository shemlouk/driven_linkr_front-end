import styled from "styled-components";

export const Header = styled.header`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    padding: 0px 18px;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
`

export const LogoBox = styled.div`
    font-family: "Passion One", sans-serif;
    font-size: 49px;
    letter-spacing: 0.2rem;
    color: #FFFFFF;
`

export const LoggedUser = styled.div`
    display: flex;
    height: 53px;


    div {
        display: flex;
        align-items: center;
        font-size: 1.5em;
        color: #FFFFFF;
        margin-right: 8px;
    }
    
    img {
        width: 53px;
        height: 53px;
        border-radius: 27px;
    }
`

export const SearchBar = styled.div`
    width: 40%;
    min-width: 350px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 8px;
    

    input {
        display: flex;
        align-items: center;
        width: 95%;
        height: 95%;
        box-sizing: border-box;
        padding: 0 12px;
        background-color: transparent;
        font-size: 19px;
        

    }
    
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 100%;
        font-size: 2em;
        color: #C6C6C6;
    }
`