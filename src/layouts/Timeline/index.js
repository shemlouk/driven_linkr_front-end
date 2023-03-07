import * as H from "../../components/Header"
import { IoSearchSharp, IoChevronDownSharp } from "react-icons/io5";

const Timeline = () => {
    return (
        <H.Header>
            <H.LogoBox>
                linkr
            </H.LogoBox>
            <H.SearchBar>
                <input placeholder="Search for people" />
                <div><IoSearchSharp /></div>
            </H.SearchBar>
            <H.LoggedUser>
                <div><IoChevronDownSharp /></div>
                <img src="https://www.w3schools.com/howto/img_avatar.png" />
            </H.LoggedUser>
        </H.Header>
    )
}

export default Timeline