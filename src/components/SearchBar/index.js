import { useCallback, useEffect, useRef, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { API_URL } from "../../utils/constants";
import { IoSearchSharp } from "react-icons/io5";
import SearchSpinner from "../SearchSpinner";
import { Link } from "react-router-dom";
import * as S from "./styles";
import axios from "axios";

const SearchBar = () => {
  const [showResultBox, setShowResultBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const containerRef = useRef();

  const searchForUser = useCallback(async (searchString) => {
    if (!searchString) {
      setShowResultBox(false);
      return;
    }
    setShowResultBox(true);
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}/user/search?name=${searchString}`
      );
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
    <S.Container ref={containerRef}>
      <DebounceInput
        minLength={3}
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
              <S.SearchItem key={user.id}>
                <Link to={`/user/${user.id}`}>
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
