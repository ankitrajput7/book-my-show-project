import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMovieToPlayListApi, getSeriesDetailsApi } from "../../utils/axios";
import { TMDB_BASE_URL } from "../../utils/constants";

function TvSerialCard() {
  const { id } = useParams();
  const [seriesDetail, setSeriesDetail] = useState({});

  useEffect(() => {
    async function fetchSeriesDetails(id) {
      let { data } = await getSeriesDetailsApi(id);
      setSeriesDetail(data);
      console.log(data);
    }

    fetchSeriesDetails(id);
  }, []);

  let posterImageUrl = TMDB_BASE_URL + seriesDetail.poster_path;
  let backDropImageUrl = TMDB_BASE_URL + seriesDetail.backdrop_path;
  const {
    name,
    first_air_date,
    overview,
    spoken_languages,
    number_of_episodes,
    number_of_seasons,
  } = seriesDetail;

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

  return (
    <div className="flex flex-col">
      <div className="relative border-[1px] border-black/60 ">
        <img className="w-full h-96" src={backDropImageUrl} alt="posterg"></img>

        <img
          className="absolute top-8 left-[10vw] h-80 m-0 rounded-md bg-slate-800"
          src={posterImageUrl}
          alt="posterg"
        ></img>
      </div>

      <div className="flex flex-col space-y-2 py-4 bg-cyan-950 text-white">
        <div className="self-center flex text-lg">
          <h2 className="self-center mr-1 font-semibold">{name}</h2>
          <p className="opacity-40">({first_air_date?.split("-")[0]})</p>
        </div>

        <div className="self-center text-sm flex flex-col space-y-1">
          <p>
            ({first_air_date}) • {number_of_episodes} Episodes •{" "}
            {number_of_seasons} Seasons
          </p>
        </div>

        <div className="flex flex-col space-y-1 p-4">
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm"> {overview}</p>
        </div>

        <button
          className="border-[1px]  w-40 px-2 py-1 rounded-md text-white bg-cyan-900 self-center"
          onClick={handleAddToWatchList}
        >
          Add To Watch List
        </button>
      </div>
    </div>
  );
}

export default TvSerialCard;
