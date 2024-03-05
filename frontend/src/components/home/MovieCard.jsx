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
  }, [id]);

  const handleAddToWatchList = () => {
    addMovieToPlayListApi(id)
      .then((result) => {
        if (result.status) {
          alert(result.message);
        } else {
          alert("Login first.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(movie);

  const convertMinToHourmin = (min) => {
    if (min < 60) {
      return `0h ${min}m`;
    } else {
      let hour = Math.floor(min / 60);
      let remainingMin = min % 60;

      return `${hour}h ${remainingMin}m`;
    }
  };

  return (
    <div className="flex flex-col text-white">
      <div className="relative border-[1px] border-black/60 ">
        <img
          className="h-96 w-full bg-blend-lighten"
          src={`${TMDB_BASE_URL}${movie?.backdrop_path}`}
          alt="imghs"
        ></img>

        <img
          className="absolute top-8 left-[10vw] h-80 m-0 rounded-md bg-slate-800"
          src={`${TMDB_BASE_URL}${movie?.poster_path}`}
          alt="mlp"
        ></img>
      </div>

      <div className="bg-cyan-950 flex flex-col space-y-4 py-4">
        <div className="self-center flex space-x-2">
          <h2 className="text-xl font-semibold">{movie?.original_title}</h2>
          <p className="text-xl opacity-50">
            ({movie?.release_date?.split("-")[0]})
          </p>
        </div>

        <div className="self-center text-sm flex flex-col w-full bg-cyan-950 space-y-2">
          <div className="self-center flex">
            <p className="">
              ({movie?.release_date}) • {convertMinToHourmin(movie?.runtime)}
            </p>
          </div> 

          <ul className="flex space-x-2 self-center">
            {movie?.genres?.map((types, index) => {
              if (index === movie?.genres?.length - 1) {
                return <li key={types?.id}>{types?.name} </li>;
              }

              return <li key={types?.id}>{types?.name},</li>;
            })}
          </ul>
        </div>

        <section className="px-6 pb-4">
          <p className="text-sm opacity-70">{movie?.tagline}</p>
          <h2 className="text-lg font-bold mb-1">Overview</h2>
          <p className="text-sm">{movie?.overview}</p>
        </section>

        <button
          className="text-white border-[1px] bg-cyan-900 w-fit px-4 py-1 rounded self-center"
          onClick={handleAddToWatchList}
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
