import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../hooks/SessionContext";
import { HashtagList, HashtagName, TrendingSection } from "./styled";


export default function Trending() {
    const { session } = useContext(SessionContext);
    const [isLoading, setIsLoading] = useState(true);
    const [trendingTags, setTrendingTags] = useState(null);

    useEffect(() => {
        getTrending();
    }, []);

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

    return (
        <>
            <TrendingSection>
                <span>Trending</span>
                <HashtagList>
                {
                    isLoading ? (<HashtagName>Carregando...</HashtagName>) : trendingTags.map((tag) => {
                        return <HashtagName key={tag.id}># {tag.name}</HashtagName>
                    })
                }
                </HashtagList>
            </TrendingSection>
        </>
    );
}