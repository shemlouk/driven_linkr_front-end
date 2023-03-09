import { HashtagList, HashtagName, TrendingSection } from "./styled";
import { SessionContext } from "../../hooks/SessionContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function Trending() {
  const [trendingTags, setTrandingTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    getTrending();
  }, []);

  async function getTrending() {
    try {
      const trending = (
        await axios.get(
          `${process.env.REACT_APP_API_URL}/trending`,
          session.auth
        )
      ).data;
      setTrandingTags(trending);
      setIsLoading(false);
    } catch (error) {
      console.error(`getTrending ${error}`);
    }
  }

  return (
    <>
      <TrendingSection>
        <span>Trending</span>
        <HashtagList>
          {isLoading ? (
            <HashtagName>Carregando...</HashtagName>
          ) : (
            trendingTags.map((tag) => {
              return <HashtagName key={tag.id}># {tag.name}</HashtagName>;
            })
          )}
        </HashtagList>
      </TrendingSection>
    </>
  );
}
