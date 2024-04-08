import { useNavigate } from "react-router-dom";
import { TMDB_BASE_URL } from "../../../utils/constants";

const MovieCard = ({ movie }) => {
  const imageUrl = `${TMDB_BASE_URL}${movie.poster_path}`;
  const navigate = useNavigate();

  const handleMovie = (e) => {
    e.stopPropagation();
    navigate(`/movie/movie/${movie.id}`);
  };

  if (
    (movie.original_language !== "en" && movie.original_language !== "hi") ||
    !movie.original_title ||
    !movie.poster_path
  ) {
    return null;
  }

  return (
    <div onClick={handleMovie} className="w-48">
      <img
        className=" object-cover w-full align-middle rounded-md"
        src={imageUrl}
        alt={movie.poster_path}
      ></img>
      <div>
        <h2 className="text-sm font-bold">{movie.original_title}</h2>
        <span>{movie.original_language} </span>
      </div>
    </div>
  );
};

export default MovieCard;
