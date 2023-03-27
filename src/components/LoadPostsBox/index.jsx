import { Container } from "./styles"
import { IoReloadSharp } from "react-icons/io5";


const LoadPostBox = ({ newPosts,refreshPostList }) => {
    return (
        <Container data-test="load-btn" onClick={refreshPostList}>
            <p>
                {newPosts} new posts, load more! <IoReloadSharp />
            </p>
        </Container>
    )
}

export default LoadPostBox