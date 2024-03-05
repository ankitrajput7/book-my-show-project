import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCarosalList from "./MovieCarosalList";
import {
  getNowPlayingMoviesApi,
  getTopRatedMoviesApi,
  getTvSerialApi,
} from "../../../utils/axios";

function MoviesCarosal({ type }) {
  const [movieList, setMovieList] = useState(null);

  useEffect(() => {
    let api;
    if (type === "now playing") {
      api = getNowPlayingMoviesApi;
    } else if (type === "top rated") {
      api = getTopRatedMoviesApi;
    } else {
      api = getTvSerialApi;
    }

    async function getMovies() {
      let data = await api();
      setMovieList(data?.data?.results);
    }

    getMovies();
  }, []);

  return (
    <div className="flex flex-col lg:p-8 md:p-6 sm:p-4">
      <div className="flex justify-between">
        <h2 className=" font-bold text-black/70 lg:text-2xl md:text-xl sm:text-lg">
          {type === "now playing"
            ? "Recommended Movies"
            : type === "top rated"
            ? "Top Rated Movies"
            : "Recommended TV Serials"}
        </h2>
        <a to={"/home/movies"} className="text-red-500 text-sm cursor-pointer">
          See All{">"}
        </a>
      </div>

      <div className="flex  py-2 relative space-x-2  lg:space-x-8 md:space-x-6 sm:space-x-4">
        <MovieCarosalList
          movieList={movieList}
          type={type}
        ></MovieCarosalList>
      </div>
    </div>
  );
}

export default MoviesCarosal;
