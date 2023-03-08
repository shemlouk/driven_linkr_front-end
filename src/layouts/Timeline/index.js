import Header from "../Header/index"
import * as P from "./styles"
import { IoHeartOutline, IoTrashOutline, IoPencilSharp } from "react-icons/io5";
import WritePost from "../../components/WritePost";

const Timeline = () => {
    return (
        <>
            <Header />
            <P.PageContainer>
                <P.TitleBox>
                    timeline
                </P.TitleBox>
                <P.ContentWrapper>
                    <P.PostWrapper>
                        <WritePost />
                        <P.PostListing>
                            <P.PostBox>
                                <P.LeftSide>
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                                    <div>
                                        <IoHeartOutline />
                                        <p>13 likes</p>
                                    </div>
                                </P.LeftSide>
                                <P.RightSide>
                                    <P.PostUser>
                                        <p>Lindo Nome</p>
                                        <div>
                                            <span><IoPencilSharp /></span>
                                            <span><IoTrashOutline /></span>
                                        </div>
                                    </P.PostUser>
                                    <P.PostContent>
                                        <p>
                                            Muito Maneiro esse Tutorial de Material UI com React, deem uma olhada! <a>#react</a> <a>#material</a>
                                        </p>
                                        <P.LinkPreview>
                                            <div>
                                                <span>All Hope Is Gone (Audio)</span>
                                                <p>Slipknot's official audio stream for 'All Hope Is Gone' from the album, All Hope Is Gone - available now on Roadrunner Records. Download it at https://slipkn...</p>
                                                <p>https://www.youtube.com/watch?v=Wn2w3j_xmbw&ab_channel=Slipknot</p>
                                            </div>
                                            <img src="https://i.ytimg.com/vi/Wn2w3j_xmbw/maxresdefault.jpg" />
                                        </P.LinkPreview>
                                    </P.PostContent>
                                </P.RightSide>
                            </P.PostBox>
                            <P.PostBox>
                                <P.LeftSide>
                                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                                    <div>
                                        <IoHeartOutline />
                                        <p>13 likes</p>
                                    </div>
                                </P.LeftSide>
                                <P.RightSide>
                                    <P.PostUser>
                                        <p>Lindo Nome</p>
                                        <div>
                                            <span><IoPencilSharp /></span>
                                            <span><IoTrashOutline /></span>
                                        </div>
                                    </P.PostUser>
                                    <P.PostContent>
                                        <p>
                                            Muito Maneiro esse Tutorial de Material UI com React, deem uma olhada! <a>#react</a> <a>#material</a>
                                        </p>
                                        <P.LinkPreview>
                                            <div>
                                                <span>All Hope Is Gone (Audio)</span>
                                                <p>Slipknot's official audio stream for 'All Hope Is Gone' from the album, All Hope Is Gone - available now on Roadrunner Records. Download it at https://slipkn...</p>
                                                <p>https://www.youtube.com/watch?v=Wn2w3j_xmbw&ab_channel=Slipknot</p>
                                            </div>
                                            <img src="https://i.ytimg.com/vi/Wn2w3j_xmbw/maxresdefault.jpg" />
                                        </P.LinkPreview>
                                    </P.PostContent>
                                </P.RightSide>
                            </P.PostBox>
                        </P.PostListing>
                    </P.PostWrapper>
                    <P.SideMenu>
                        <p>trending</p>
                        <ul>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                            <li># javascript</li>
                        </ul>
                    </P.SideMenu>
                </P.ContentWrapper>
            </P.PageContainer>
        </>

    )
}

export default Timeline