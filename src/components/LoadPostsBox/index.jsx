import { Container } from "./styles"
import { IoReloadSharp } from "react-icons/io5";


const LoadPostBox = ({ newPosts,refreshPostList }) => {
    return (
        <Container onClick={refreshPostList}>
            <p>
                {newPosts} new posts, load more! <IoReloadSharp />
            </p>
        </Container>
    )
}

export default LoadPostBox