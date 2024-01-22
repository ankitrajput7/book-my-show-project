import React, { useEffect, useState } from "react";
import WatchListPoster from "./WatchListPoster";
import { getWatchListMoviesApi } from "../../utils/axios";

function WatchList() {
  const [watchList, setWatchlist] = useState([]);

  useEffect(() => {
    try {
      async function getWatchList() {
        let movieWatchList = await getWatchListMoviesApi();
        setWatchlist(movieWatchList?.data);
      }

      getWatchList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      {watchList.length > 0 &&
        watchList.map((movie) => {
          console.log(movie);
          return (
            <WatchListPoster key={movie.id} movie={movie}></WatchListPoster>
          );
        })}
    </div>
  );
}

export default WatchList;
