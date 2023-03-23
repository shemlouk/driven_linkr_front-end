import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "../../hooks/SessionContext";
import { DebounceInput } from "react-debounce-input";
import { IoSearchSharp } from "react-icons/io5";
import SearchSpinner from "../SearchSpinner";
import { Link } from "react-router-dom";
import API from "../../config/api";
import * as S from "./styles";

const SearchBar = () => {
  const [showResultBox, setShowResultBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const containerRef = useRef();
  const inputRef = useRef();
  const {
    session: { user },
  } = useContext(SessionContext);

  const searchForUser = useCallback(async (searchString) => {
    if (!searchString) {
      setShowResultBox(false);
      return;
    }
    setShowResultBox(true);
    setIsLoading(true);
    try {
      const { data } = await API.get(`/user/search?name=${searchString}`);
      data.forEach((u) => (u.isFollowing = user.network.includes(u.id)));
      data.sort((a, b) => b.isFollowing - a.isFollowing);
      setUsers(data);
      setIsLoading(false);
    } catch ({ message }) {
      setUsers([]);
      setIsLoading(false);
      console.error(message);
    }
  });

  useEffect(() => {
    const handleClick = ({ target }) => {
      if (target.parentElement === containerRef.current) return;
      setShowResultBox(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <S.Container
      ref={containerRef}
      onClick={() => searchForUser(inputRef.current.state.value)}
    >
      <DebounceInput
        minLength={3}
        ref={inputRef}
        data-test="search"
        debounceTimeout={300}
        placeholder="Search for people"
        onChange={({ target }) => searchForUser(target.value)}
      />
      <IoSearchSharp />
      {showResultBox && (
        <S.ResultBox>
          {isLoading ? (
            <S.SearchItem>
              <SearchSpinner />
            </S.SearchItem>
          ) : !users.length ? (
            <S.SearchItem>
              <p>No results</p>
            </S.SearchItem>
          ) : (
            users.map((user) => (
              <S.SearchItem
                key={user.id}
                showFollowing={user.isFollowing}
                onClick={() => {
                  inputRef.current.state.value = "";
                }}
              >
                <Link to={`/user/${user.id}`} data-test="user-search">
                  <img src={user.profilePicture} />
                  <span>{user.name}</span>
                </Link>
              </S.SearchItem>
            ))
          )}
        </S.ResultBox>
      )}
    </S.Container>
  );
};

export default SearchBar;
