import React, { useEffect, useState } from "react";
import WatchListPoster from "./WatchListPoster";
import { getWatchListMoviesApi } from "../../utils/axios";

function WatchList() {
  const [watchList, setWatchlist] = useState([]);
  const [removedFromWatchlist, setRemovedFromWatchlist] = useState(true);

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
  }, [removedFromWatchlist]);

  const handleWatchlist = () => {
    setRemovedFromWatchlist(!removedFromWatchlist);
  };

  return (
    <div>
      {watchList.length > 0 &&
        watchList.map((movie) => {
          return (
            <WatchListPoster key={movie.id} movie={movie} handleWatchlist={handleWatchlist}></WatchListPoster>
          );
        })}
    </div>
  );
}

export default WatchList;
