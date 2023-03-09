import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashtagContext from "../../hooks/HashtagContext";
import SessionContext from "../../hooks/SessionContext";
import { HashtagList, HashtagName, TrendingSection } from "./styled";


export default function Trending() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);
    const { setHashtag } = useContext(HashtagContext); 
    const [isLoading, setIsLoading] = useState(true);
    const [trendingTags, setTrendingTags] = useState(null);
    
    useEffect(() => {
        async function getTrending() {
            try {
                const trending = (await axios.get(`${process.env.REACT_APP_API_URL}/trending`, session.auth)).data;
                setTrendingTags(trending);
                setIsLoading(false);
            } catch (error) {
                console.error(`getTrending ${error}`);
                alert("An error occurred while trying to fetch the trending hashtags, please refresh the page.");
            }
        }

        getTrending();
    }, [session]);

    function selectHashtag(hashtag) {
        setHashtag({
            id: hashtag.id,
            hashtag: hashtag.name,
            quantity: hashtag.quantity
        });
        navigate(`/hashtag/${hashtag.name}`);
    }

    return (
        <>
            <TrendingSection>
                <span>Trending</span>
                <HashtagList>
                {
                    isLoading ? (<HashtagName>Carregando...</HashtagName>) : trendingTags.map((tag) => {
                        return <HashtagName key={tag.id} onClick={() => selectHashtag(tag)} ># {tag.name}</HashtagName>
                    })
                }
                </HashtagList>
            </TrendingSection>
        </>
    );
}