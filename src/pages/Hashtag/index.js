import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoHeartOutline, IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import HashtagContext from "../../hooks/HashtagContext";
import Header from "../../layouts/Header";
import Trending from "../../layouts/Trending";
import * as P from "../../pages/Timeline/styles";
import { API_URL } from "../../utils/constants";
import { ReactTagify } from "react-tagify";

export default function Hashtag() {
    const navigate = useNavigate();
    const localSession = JSON.parse(localStorage.getItem("session"));
    const { hashtag, setHashtag } = useContext(HashtagContext);
    const [isLoading, setIsLoading] = useState(true);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        if (!localSession || !hashtag) {
            return navigate("/timeline");
        }

        async function getPostsWithHashtag() {
            try {
                const res = (await axios.get(`${API_URL}/hashtag/${hashtag.id}`, localSession.auth)).data;
                setPostList(res.slice(0, 20));
                console.log(res);
                setIsLoading(false);
            } catch (error) {
                console.error(`getPostWithHashtag: ${error}`);
            }
        }

        getPostsWithHashtag();
    }, [hashtag]);

    async function selectHashtag(hashtag) {
        hashtag = hashtag.replace("#", "");
        
        try {
            const res = (await axios.get(`${API_URL}/hashtag/search/${hashtag}`, localSession.auth)).data;
            setHashtag({
                ...res
            });
        } catch (error) {
            console.error(`selectHashtag: ${error}`);
        }
    }

    return (
        <>
            <Header />

            <P.PageContainer>
                <P.TitleBox>
                    {`# ${hashtag?.name}`}
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
                                            <P.ImageCover src={post.profile_picture} alt={`Foto de perfil do usuário ${post.username}`}/>
                                            <div>
                                                <IoHeartOutline />
                                                <p>13 likes</p>
                                            </div>
                                        </P.LeftSide>
                                        <P.RightSide>
                                            <P.PostUser>
                                                <p>{post.username}</p>
                                                <div>
                                                    <span><IoPencilSharp /></span>
                                                    <span><IoTrashOutline /></span>
                                                </div>
                                            </P.PostUser>
                                            <P.PostContent>
                                                <ReactTagify tagStyle={{fontWeight: 700, color: "white", cursor: "pointer"}} tagClicked={(tag)=> selectHashtag(tag)}>
                                                    <p>{post.description}</p>
                                                </ReactTagify>
                                                <P.LinkPreview>
                                                    <div>
                                                        <span>{post.preview_title}</span>
                                                        <p>{post.preview_desc}</p>
                                                        <p>{post.url}</p>
                                                    </div>
                                                    <P.ImageCover src={post.preview_img} alt={`Preview do ${post.preview_title}`} />
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
                    <Trending/>
                </P.ContentWrapper>
            </P.PageContainer>
        </>
    );
}