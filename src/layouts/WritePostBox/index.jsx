import { PublishContext } from "../../hooks/PublishContext";
import { SessionContext } from "../../hooks/SessionContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import API from "../../config/api";
import * as W from "./styles";

const WritePost = () => {
  const HASHTAG_REGEX = /(?:^|\s)#(\w+)/g;

  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { updateList, setUpdateList } = useContext(PublishContext);
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

      const res = await API.post(`/timeline`, post, session.auth);
      const post_id = res.data.id;

      const postHashtags = sentHashtags.map((hashtag_id) => ({
        post_id,
        hashtag_id,
      }));

      for (const postTag of postHashtags) {
        await API.post(`/posts/hashtag`, postTag, session.auth);
      }

      setIsLoading(false);
      setPost({
        url: "",
        description: "",
      });
      setUpdateList(!updateList);
      navigate("/timeline");
    } catch (error) {
      console.log(error);
      alert("There was an error publishing your link");
      setIsLoading(false);
    }
  };

  useEffect(() => {
  }, [updateList]);

  const saveHashtags = async () => {
    try {
      const hashtags = post.description
        .match(HASHTAG_REGEX)
        .map((tag) => tag.replace("#", "").trim());
      const hashtagIds = [];
      for (const tag of hashtags) {
        const id = (await API.post(`/hashtag`, { name: tag }, session.auth))
          .data.id;
        hashtagIds.push(id);
      }
      return hashtagIds;
    } catch (error) {
      console.log(`saveHashtags: ${error}`);
    }
  };
  return (
    <>
      <W.WritePostBox data-test="publish-box">
        <W.LoggedUser>
          <img src={session.user.profilePicture} alt="avatar" />
        </W.LoggedUser>
        <W.PublishForm onSubmit={handleSubmit}>
          <p>What are you going to share today?</p>
          <input
            data-test="link"
            disabled={isLoading}
            className="url-input"
            placeholder="http://..."
            value={post.url}
            onChange={(e) => setPost({ ...post, url: e.target.value })}
          />
          <input
            data-test="description"
            disabled={isLoading}
            className="desc-input"
            placeholder="Awesome article about #Javascript..."
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
          <button data-test="publish-btn" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </W.PublishForm>
      </W.WritePostBox>
    </>
  );
};

export default WritePost;
