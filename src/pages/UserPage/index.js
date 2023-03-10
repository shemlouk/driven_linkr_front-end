import Header from "../../layouts/Header/index";
import React, { useState, useEffect, useContext } from "react";
import * as P from "../Timeline/styles";
import { IoHeartOutline, IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import axios from "axios";
import Trending from "../../layouts/Trending";
import { SessionContext } from "../../hooks/SessionContext";
import { API_URL } from "../../utils/constants";
import { Link, useParams, useNavigate } from "react-router-dom";

const UserPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const localSession = JSON.parse(localStorage.getItem("session"));
    const [isLoading, setIsLoading] = useState(true)
    const [postList, setPostList] = useState([])
    const [username, setUsername] = useState("")

    useEffect(() => {
        if (!localSession) {
            return navigate("/timeline");
        }

        async function getUserPosts() {

            try {
                const res = await axios.get(`${API_URL}/user/${id}`, localSession.auth)
                setPostList(res.data)
                setUsername(res.data.name)
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
                                    <P.PostBox key={post.id}>
                                        <P.LeftSide>
                                            <img src={post.profilePicture} />
                                            <div>
                                                <IoHeartOutline />
                                                <p>13 likes</p>
                                            </div>
                                        </P.LeftSide>
                                        <P.RightSide>
                                            <P.PostUser>
                                                <Link to={`/user/${post.user_id}`}>
                                                    <p>{post.name}</p>
                                                </Link>
                                                <div>
                                                    <span><IoPencilSharp /></span>
                                                    <span><IoTrashOutline /></span>
                                                </div>
                                            </P.PostUser>
                                            <P.PostContent>
                                                <p>{post.description}</p>
                                                <P.LinkPreview>
                                                    <div>
                                                        <span>{post.preview_title}</span>
                                                        <p>{post.preview_desc}</p>
                                                        <p>{post.url}</p>
                                                    </div>
                                                    <img src={post.preview_img} alt="preview_img" />
                                                </P.LinkPreview>
                                            </P.PostContent>
                                        </P.RightSide>
                                    </P.PostBox>
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