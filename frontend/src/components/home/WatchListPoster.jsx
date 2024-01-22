import { TMDB_BASE_URL } from "../../utils/constants";

function WatchListPoster({ movie }) {
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
            <p className="hidden text-sm font-normal mb-2 sm:flex max-h-32 overflow-hidden">
              {overview}
            </p>
            <p className="text-xs  font-bold"> {release_date} </p>
            <p className="text-xs font-semibold"> {original_language} </p>
          </div>
      </div>
    </div>
  );
}

export default WatchListPoster;
