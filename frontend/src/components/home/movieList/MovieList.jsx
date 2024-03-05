import { useEffect, useState } from "react";
import { getTopRatedMoviesApi } from "../../../utils/axios";
import MovieCard from "./MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

function MovieList() {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function getMovie() {
      const data = await getTopRatedMoviesApi(page);
      setMovieList((prevMovies) => [
        ...prevMovies,
        ...(data?.data?.results || []),
      ]);
    }
    getMovie();
  }, [page]);

  function handleScroll() {
    setPage(page + 1);
  }

  return (
    <InfiniteScroll
      dataLength={movieList?.length}
      next={handleScroll}
      hasMore={"true"}
      loader={<h2>loading...</h2>}
    >
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
    </InfiniteScroll>
  );
}

export default MovieList;
