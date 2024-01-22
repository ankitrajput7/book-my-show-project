import { createContext, useContext, useState } from "react";
import SearchText from "../../components/header/SearchText";

const SearchContext = createContext();
export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [movieList, setMovieList] = useState(null);

  const openSearch = (list) => {
    setMovieList(list);
    setShowSearch(true);
  };

  const closeSearch = () => setShowSearch(false);

  return (
    <SearchContext.Provider value={{ openSearch, closeSearch }}>
      {children}
      {showSearch && <SearchText movieList={movieList || null} />}
    </SearchContext.Provider>
  );
};
