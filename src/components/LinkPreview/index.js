import previewImage from "../../assets/defaultPreviewImage.png";
import PostContext from "../../hooks/PostContext.js";
import { useCallback, useContext } from "react";
import * as S from "./styles.js";

const LinkPreview = () => {
  const { preview_title, preview_desc, url, preview_img } =
    useContext(PostContext);
  const openLink = useCallback(() => {
    window.open(url, "_blank");
  });
  return (
    <S.Container onClick={openLink}>
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
