import * as W from "./styles"
import { useState } from "react"
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom"
import axios from "axios"


const WritePost = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [post, setPost] = useState({
        url: "",
        description: ""
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            await axios.post(`${API_URL}/timeline`, post)
            setIsLoading(false)
            setPost({
                url: "",
                description: ""
            })
            navigate("/timeline")

        } catch (error) {
            console.log(error)
            alert("There was an error publishing your link")
            setIsLoading(false)
        }
    }
    return (
        <>
            <W.WritePostBox>
                <W.LoggedUser>
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
                </W.LoggedUser>
                <W.PublishForm onSubmit={handleSubmit}>
                    <p>What are you going to share today?</p>
                    <input
                        className="url-input"
                        placeholder="http://..."
                        value={post.url}
                        onChange={e => setPost({ ...post, url: e.target.value })}
                    />
                    <input
                        className="desc-input"
                        placeholder="Awesome article about #Javascript..."
                        value={post.description}
                        onChange={e => setPost({ ...post, description: e.target.value })}
                    />
                    <button disabled={isLoading}>
                        {isLoading ? "Publishing..." : "Publicar"}
                    </button>
                </W.PublishForm>
            </W.WritePostBox>
        </>
    )
}

export default WritePost
