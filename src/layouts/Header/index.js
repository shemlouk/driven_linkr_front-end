import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { IoSearchSharp, IoChevronDownSharp } from "react-icons/io5";
import LoadingSpinner from "../../components/LoadingSpinner.js";
import SessionContext from "../../hooks/SessionContext";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constants";
import * as S from "./style.js";
import axios from "axios";

const Header = () => {
  const { setSession, session } = useContext(SessionContext);
  const [sessionData, setSessionData] = useState(null);
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
      await axios.delete(`${API_URL}/signin`, sessionData.auth);
      delete localStorage.session;
      setSession(null);
      navigate("/");
    } catch ({ response }) {
      setIsLoading(false);
      console.error(response);
      alert("Could not logout, please try again later!");
    }
  });

  const validateSession = useCallback(async () => {
    setIsLoading(true);
    const localSession = JSON.parse(localStorage.getItem("session"));
    if (!localSession) {
      alert("Can't access this page.");
      navigate("/");
      return;
    }
    try {
      await axios.get(`${API_URL}/signin/validate`, localSession.auth);
      setSession({ session: localSession, setSession });
      setSessionData({ ...localSession });
      setIsLoading(false);
    } catch ({ response }) {
      alert("Session expired! Please sign in again.");
      console.error(response);
      navigate("/");
    }
  });

  useEffect(() => {
    if (!session) {
      validateSession();
    } else {
      setSessionData(session);
    }
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
          <S.SearchBar>
            <input placeholder="Search for people" />
            <div>
              <IoSearchSharp />
            </div>
          </S.SearchBar>
          <S.LoggedUser
            ref={profileRef}
            active={showLogOut}
            onClick={() => setShowLogOut(!showLogOut)}
          >
            <IoChevronDownSharp />
            <img src={sessionData?.user?.profilePicture} />
            <div onClick={logout}>Logout</div>
          </S.LoggedUser>
        </S.Header>
      )}
    </>
  );
};

export default Header;
