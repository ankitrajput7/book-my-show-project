import { removeFromWatchlistApi } from "../../utils/axios";
import { TMDB_BASE_URL } from "../../utils/constants";

function WatchListPoster({ movie, handleWatchlist }) {
  const {
    poster_path,
    title,
    release_date,
    original_title,
    original_language,
    adult,
    overview,
  } = movie;
  const movieUrl = TMDB_BASE_URL + poster_path;

  const handleRemoveMovie = async () => {
    let responce = await removeFromWatchlistApi(movie.id);
    if (responce?.status) {
      alert("Movie removed from watchlist successfully.");
      handleWatchlist();
    }
  };

  if (!title) return null;

  return (
    <div className="flex justify-center mt-4 ">
      <div className=" flex  space-x-4 md:space-x-8 border border-black p-4 rounded-xl">
        <img
          className="rounded-md w-[15vw] h-[20vw] self-center"
          src={movieUrl}
          alt={title}
        ></img>

        <div className="flex flex-col self-center  w-[25vw]">
          <h2 className="text-base font-bold md:text-xl  md:mb-4 sm:font-bold">
            {title || original_title}
          </h2>
          <p className="hidden text-sm font-normal mb-2 sm:flex max-h-[8.90rem] overflow-hidden">
            {overview}
          </p>
          <p className="text-xs  font-bold"> {release_date} </p>
          <p className="text-xs font-semibold"> {original_language} </p>
          <button
            className="bg-red-500 text-white text-base mt-4 w-fit px-2 rounded"
            onClick={handleRemoveMovie}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchListPoster;
