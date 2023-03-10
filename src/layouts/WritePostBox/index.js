import * as W from "./styles";
import { useContext, useState } from "react";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SessionContext } from "../../hooks/SessionContext";
import { PublishContext } from "../../hooks/PublishContext";

const WritePost = () => {
  const HASHTAG_REGEX = /(?:^|\s)#(\w+)/g;

  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { setUpdateList } = useContext(PublishContext)
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({
    url: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const sentHashtags = await saveHashtags();

      const res = await axios.post(`${API_URL}/timeline`, post, session.auth);
      const post_id = res.data.id;

      const postHashtags = sentHashtags.map((hashtag_id) => ({
        post_id,
        hashtag_id,
      }));

      for (const postTag of postHashtags) {
        await axios.post(`${API_URL}/posts/hashtag`, postTag, session.auth);
      }

      setIsLoading(false);
      setPost({
        url: "",
        description: "",
      });
      setUpdateList(true)
      navigate("/timeline");
    } catch (error) {
      console.log(error);
      alert("There was an error publishing your link");
      setIsLoading(false);
    }
  };

  const saveHashtags = async () => {
    try {
      const hashtags = post.description
        .match(HASHTAG_REGEX)
        .map((tag) => tag.replace("#", "").trim());
      const hashtagIds = [];
      for (const tag of hashtags) {
        const id = (
          await axios.post(`${API_URL}/hashtag`, { name: tag }, session.auth)
        ).data.id;
        hashtagIds.push(id);
      }
      return hashtagIds;
    } catch (error) {
      console.log(`saveHashtags: ${error}`);
    }
  };
  return (
    <>
      <W.WritePostBox>
        <W.LoggedUser>
          <img src={session.user.profilePicture} alt="avatar" />
        </W.LoggedUser>
        <W.PublishForm onSubmit={handleSubmit}>
          <p>What are you going to share today?</p>
          <input
            disabled={isLoading}
            className="url-input"
            placeholder="http://..."
            value={post.url}
            onChange={(e) => setPost({ ...post, url: e.target.value })}
          />
          <textarea
            disabled={isLoading}
            className="desc-input"
            placeholder="Awesome article about #Javascript..."
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
          <button disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </W.PublishForm>
      </W.WritePostBox>
    </>
  );
};

export default WritePost;
