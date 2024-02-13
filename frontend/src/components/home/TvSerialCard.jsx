import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeriesDetailsApi } from "../../utils/axios";
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
    overview,
    spoken_languages,
    number_of_episodes,
    number_of_seasons,
  } = seriesDetail;

  return (
    <div>
      <img src={posterImageUrl} alt="posterg"></img>
      <img src={backDropImageUrl} alt="posterg"></img>
      <h2>{name}</h2>
      <p>{overview} </p>
      <ul>
        {spoken_languages?.map((lang) => {
          return <li key={lang.english_name}>{lang.english_name}</li>;
        })}
      </ul>
      <p>{number_of_episodes} </p>
      <p>{number_of_seasons} </p>
    </div>
  );
}

export default TvSerialCard;
