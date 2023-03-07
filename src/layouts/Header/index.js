import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { IoSearchSharp, IoChevronDownSharp } from "react-icons/io5";
import SessionContext from "../../hooks/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import * as S from "./style.js";
import axios from "axios";

const Header = () => {
  const [showLogOut, setShowLogOut] = useState(false);
  const { user, auth } = useContext(SessionContext);
  const loggedUser = useRef(null);
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    if (e.target.parentElement === loggedUser.current) return;
    setShowLogOut(false);
  });

  const logout = useCallback(async () => {
    try {
      await axios.delete(`${API_URL}/signin`, auth);
      delete localStorage.session;
      navigate("/");
    } catch ({ response }) {
      console.error(response);
      alert("Could not logout, please try again later!");
    }
  });

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <S.Header>
      <S.LogoBox>
        <Link to="/timeline">linkr</Link>
      </S.LogoBox>
      <S.SearchBar>
        <input placeholder="Search for people" />
        <div>
          <IoSearchSharp />
        </div>
      </S.SearchBar>
      <S.LoggedUser
        ref={loggedUser}
        active={showLogOut}
        onClick={() => setShowLogOut(!showLogOut)}
      >
        <IoChevronDownSharp />
        <img src={user.profilePicture} />
        <div onClick={logout}>Logout</div>
      </S.LoggedUser>
    </S.Header>
  );
};

export default Header;
