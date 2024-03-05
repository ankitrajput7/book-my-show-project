import { useNavigate } from "react-router-dom";
import { TMDB_BASE_URL } from "../../../utils/constants";

function MovieCarosalList({ movieList, type }) {
  console.log(movieList);
  return (
    <div className="flex overflow-x-scroll no-scrollbar">
      <div className="flex">
        {movieList?.map((movie) => {
          return (
            <CaroselMovieCard
              key={movie.id}
              movie={movie}
              type={type}
            ></CaroselMovieCard>
          );
        })}
      </div>
    </div>
  );
}

export default MovieCarosalList;

const CaroselMovieCard = ({ movie, type }) => {
  const navigate = useNavigate();
  const {
    poster_path,
    id,
    original_title,
    release_date,
    name,
    first_air_date,
    title,
    original_language,
  } = movie;

  let typeMovie = type === "now playing" ? "nowplaying" : "toprated";
  let backpath = `${TMDB_BASE_URL}${poster_path}`;

  const handleClick = () => {
    type == "now playing" || type == "top rated"
      ? navigate(`/movie/${typeMovie}/${id}`)
      : navigate(`/serial/${id}`);
  };

  if (!poster_path) return null;
  if (original_language !== "hi" && original_language !== "en") return null;

  return (
    <section
      key={id}
      className="flex flex-col cursor-pointer pr-4 sm:w-[25vw] h-60 w-[25vw] sm:h-[20rem] md:w-[18vw] md:h-[25rem]"
      onClick={handleClick}
    >
      <img
        className="rounded-lg sm:w-[25vw] h-52 w-[25vw] sm:h-60 md:w-[18vw] md:h-[18rem]"
        src={backpath}
        alt={original_title}
      ></img>
      <h4 className="font-bold  text-black/70 lg:text-base md:text-sm text-xs">
        {!original_title ? name : title}
      </h4>
      <h4 className="text-black/60 lg:text-base md:text-sm text-xs">
        {!release_date ? first_air_date : release_date}
      </h4>
    </section>
  );
};
