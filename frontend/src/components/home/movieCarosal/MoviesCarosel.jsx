import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCarosalList from "./MovieCarosalList";
import {
  getNowPlayingMoviesApi,
  getTopRatedMoviesApi,
  getTvSerialApi,
} from "../../../utils/axios";

function MoviesCarosal({ type }) {
  const [baseIndex, setBaseIndex] = useState(0);
  const [movieList, setMovieList] = useState(null);

  const handlePrevious = () => {
    baseIndex !== 0 && setBaseIndex(0);
  };
  const handleNext = () => {
    baseIndex === 0 && setBaseIndex((prev) => prev + numberOfimages);
  };

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

  const [numberOfimages, setNumberOfImages] = useState(6);
  function handleSize() {
    let width = window.innerWidth;
    if (width < 650) {
      setNumberOfImages(3);
    } else if (width < 800) {
      setNumberOfImages(4);
    } else if (width < 1200) {
      setNumberOfImages(5);
    } else if (width > 1200) {
      setNumberOfImages(5);
    }
  }

  useEffect(() => {
    handleSize();
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
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
        {baseIndex !== 0 && (
          <button
            className="absolute top-2/4 left-0 bg-black/50 px-2 text-white text-2xl rounded-md"
            onClick={handlePrevious}
          >
            {"<"}
          </button>
        )}

        <MovieCarosalList
          movieList={movieList}
          images={numberOfimages}
          baseIndex={baseIndex}
          type={type}
        ></MovieCarosalList>

        {baseIndex === 0 && (
          <button
            className="absolute top-2/4 right-0 bg-black/50 px-2 text-white text-2xl rounded-md"
            onClick={handleNext}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}

export default MoviesCarosal;
