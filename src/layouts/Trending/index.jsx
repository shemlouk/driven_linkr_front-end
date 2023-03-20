import { HashtagList, HashtagName, TrendingSection } from "./styles";
import HashtagContext from "../../hooks/HashtagContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";

export default function Trending() {
  const navigate = useNavigate();
  const { setHashtag } = useContext(HashtagContext);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingTags, setTrendingTags] = useState(null);

  useEffect(() => {
    const localSession = JSON.parse(localStorage.getItem("session"));
    if (!localSession) {
      alert("Can't access this page.");
      navigate("/");
      return;
    }

    async function getTrending() {
      try {
        const trending = (await API.get(`/trending`, localSession.auth)).data;
        setTrendingTags(trending);
        setIsLoading(false);
      } catch (error) {
        console.error(`getTrending ${error}`);
        alert(
          "An error occurred while trying to fetch the trending hashtags, please refresh the page."
        );
      }
    }

    getTrending();
  }, []);

  function selectHashtag(hashtag) {
    setHashtag({
      id: hashtag.id,
      name: hashtag.name,
      quantity: hashtag.quantity,
    });
    navigate(`/hashtag/${hashtag.name}`);
  }

  return (
    <>
      <TrendingSection data-test="trending">
        <span>Trending</span>
        <HashtagList>
          {isLoading ? (
            <HashtagName>Carregando...</HashtagName>
          ) : (
            trendingTags.map((tag) => {
              return (
                <HashtagName
                  key={tag.id}
                  onClick={() => selectHashtag(tag)}
                  data-test="hashtag"
                >
                  # {tag.name}
                </HashtagName>
              );
            })
          )}
        </HashtagList>
      </TrendingSection>
    </>
  );
}
