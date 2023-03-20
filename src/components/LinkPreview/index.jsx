import previewImage from "../../assets/defaultPreviewImage.png";
import PostContext from "../../hooks/PostContext";
import { useCallback, useContext } from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

const LinkPreview = () => {
  const { preview_title, preview_desc, url, preview_img } =
    useContext(PostContext);
  const openLink = useCallback(() => {
    window.open(url, "_blank");
  });
  return (
    <S.Container data-test="link" onClick={openLink}>
        <div>
          <span>{preview_title}</span>
          <p>{preview_desc}</p>
          <p>{url}</p>
        </div>
        <figure>
          <img
            src={preview_img}
            alt="preview image from link"
            onError={({ target }) => (target.src = previewImage)}
          />
        </figure>
    </S.Container>
  );
};

export default LinkPreview;
