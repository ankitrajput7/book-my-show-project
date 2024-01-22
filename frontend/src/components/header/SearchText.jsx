import { useSearchContext } from "../../utils/context/SearchContext";
import { Link } from "react-router-dom";

function SearchText({ movieList }) {
  const { openSearch, closeSearch } = useSearchContext();
  console.log(movieList);

  if (!movieList) {
    closeSearch();
  }

  return (
    <>
      <div
        className="fixed w-full h-[100vh] top-0 left-0 bottom-0 right-0 "
        onClick={closeSearch}
      ></div>

      <div className="fixed top-20 left-1/4 z-[1000] bg-white p-4 rounded-md">
        <ul>
          {movieList?.map((movie) => {
            return (
              <li className="p-2 cursor-pointer" key={movie.id}>
                {/* <Link */}
                {/* to={`/movie/${movie?.adult}/${movie?.id}`}
                 > */}
                {/* {movie.name
                  ? movie.name
                  : movie.title
                  ? movie.title
                  : movie.original_title
                  ? movie.original_title
                  : movie.original_name} */}

                  hello
                {/* </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default SearchText;
