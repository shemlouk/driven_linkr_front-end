import { useCallback, useContext, useEffect, useState, useRef } from "react";
import profilePicture from "../../assets/defaultProfilePicture.webp";
import LoadingSpinner from "../../components/LoadingSpinner";
import { SessionContext } from "../../hooks/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";
import SearchBar from "../../components/SearchBar";
import API from "../../config/api";
import * as S from "./styles";

const Header = () => {
  const { session, updateSession, isLoggedIn } = useContext(SessionContext);
  const [showLogOut, setShowLogOut] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = useCallback((e) => {
    if (e.target.parentElement === profileRef.current) return;
    setShowLogOut(false);
  });

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await API.delete(`/signin`, session.auth);
      delete localStorage.session;
      updateSession(null);
      navigate("/");
    } catch ({ response }) {
      setIsLoading(false);
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
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <S.Header>
          <S.LogoBox>
            <Link to="/timeline">linkr</Link>
          </S.LogoBox>
          <SearchBar />
          <S.LoggedUser
            ref={profileRef}
            active={showLogOut}
            onClick={() => setShowLogOut(!showLogOut && isLoggedIn)}
          >
            <IoChevronDownSharp />
            <img
              src={isLoggedIn ? session.user.profilePicture : profilePicture}
              data-test="avatar"
            />
            <ul data-test="menu">
              <li onClick={logout} data-test="logout">
                Logout
              </li>
            </ul>
          </S.LoggedUser>
        </S.Header>
      )}
    </>
  );
};

export default Header;
