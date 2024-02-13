import { useEffect, useState } from "react";
import { getNowPlayingMoviesApi } from "../../../utils/axios";
import MovieCard from "./MovieCard";

function MovieList() {
  const [page, setPage] = useState(3);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMovie() {
      const data = await getNowPlayingMoviesApi(page);
      setMovieList((prevMovies) => [
        ...prevMovies,
        ...(data?.data?.results || []),
      ]);
    }
    getMovie();
  }, [page]);

  function handleScroll() {
    let { clientHeight, scrollHeight, scrollTop } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-col space-x-2 mt-4">
      <>
        <ul className="self-center grid grid-cols-2 gap-4 justify-center lg:grid-cols-5 lg:gap-6 md:grid-cols-4 md:gap-6 sm:grid-cols-3 ">
          {movieList?.map((movie, index) => {
            key = `${movie.id}${index}`;
            return <MovieCard key={key} movie={movie}></MovieCard>;
          })}
        </ul>
      </>
    </div>
  );
}

export default MovieList;
