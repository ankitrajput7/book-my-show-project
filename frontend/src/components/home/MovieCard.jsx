import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { TMDB_BASE_URL } from "../../utils/constants";
import { addMovieToPlayListApi, getMovieByIdApi } from "../../utils/axios";

function MovieCard() {
  const { id, type } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      let data = await getMovieByIdApi(id);
      data = data?.data;
      setMovie(data);
    }
    getMovie();
  }, []);

  const handleAddToWatchList = () => {
    addMovieToPlayListApi(id)
      .then((result) => {
        if (result.status) {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="relative border-[1px] border-black/60">
        <img
          className="h-96 w-full opacity-.5"
          src={`${TMDB_BASE_URL}${movie?.backdrop_path}`}
          alt="imghs"
        ></img>

        <div className="absolute top-0 flex p-8 pl-16">
          <img
            className="h-80 m-0 rounded-md bg-slate-800"
            src={`${TMDB_BASE_URL}${movie?.poster_path}`}
            alt="mlp"
          ></img>

          <section className="flex flex-col pl-6 top-0 p-4 text-white">
            <h1 className="text-3xl font-bold mb-4 bg-black/50 text-white w-80 p-4 rounded-md">
              {movie?.original_title}
            </h1>

            <div className="bg-black/50 text-white w-80 rounded-md p-4 mb-4">
              <div className="text-base font-semibold">
                ⭐ {movie?.vote_average}
              </div>
              <div className="text-base font-semibold mt-2">
                {movie?.release_date}
              </div>
            </div>

            <button
              className="border-[1px] border-black/10 w-40 p-2 rounded-md text-white bg-red-500 font-bold"
              onClick={handleAddToWatchList}
            >
              Add To Watch List
            </button>
          </section>
        </div>
      </div>

      <section className="p-6">
        <h2 className="text-lg font-bold mb-2">About the movie</h2>
        <p className="text-base">{movie?.overview}</p>
      </section>
    </div>
  );
}

export default MovieCard;
