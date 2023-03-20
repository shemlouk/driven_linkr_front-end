import Header from "../../layouts/Header/index";
import React, { useState, useEffect, useContext } from "react";
import * as P from "../Timeline/styles";
import axios from "axios";
import Trending from "../../layouts/Trending";
import { SessionContext } from "../../hooks/SessionContext";
import { API_URL } from "../../utils/constants";
import { useParams, useNavigate } from "react-router-dom";
import PostCard from "../../components/PostCard/index";


const UserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { session } = useContext(SessionContext)

    const [isLoading, setIsLoading] = useState(true)
    const [postList, setPostList] = useState([])
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (!session) {

            return navigate("/timeline");
        }

        async function getUserPosts() {

            try {
            
                const res = await axios.get(`${API_URL}/user/${id}`, session.auth)
                setPostList(res.data)
                setUsername(res.data[0].name)
                setIsLoading(false)
            } catch ({ response }) {
                console.error(response)
                alert("An error occurred while trying to fetch the posts, please refresh the page.")
            }
        }
        getUserPosts()
    }, [])

    return (
        <>
            <Header />
            <P.PageContainer>
                <P.TitleBox>
                    {`${username}`}'s posts
                </P.TitleBox>
                <P.ContentWrapper>
                    <P.PostWrapper>
                        <P.PostListing>
                            {isLoading ? (
                                <P.SpecialMessage>Loading...</P.SpecialMessage>
                            ) : postList.length > 0 ? (
                                postList.map((post) => (
                                    <PostCard key={post.id} {...post}/>
                                ))
                            ) : (
                                <P.SpecialMessage>There are no posts yet.</P.SpecialMessage>
                            )}
                        </P.PostListing>
                    </P.PostWrapper>
                    <Trending />
                </P.ContentWrapper>
            </P.PageContainer>
        </>

    )
}

export default UserPage