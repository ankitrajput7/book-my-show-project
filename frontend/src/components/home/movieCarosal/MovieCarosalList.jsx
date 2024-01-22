import { useNavigate } from "react-router-dom";
import { TMDB_BASE_URL } from "../../../utils/constants";

function MovieCarosalList({ images, movieList, baseIndex, type }) {
  const navigate = useNavigate();
  return (
    <>
      {movieList?.map((items, index) => {
        if (index < baseIndex + images && index >= baseIndex) {
          let typeMovie = type === "now playing" ? "nowplaying" : "toprated";
          let backpath = `${TMDB_BASE_URL}${items.poster_path}`;

          return (
            <div
              key={items.id}
              className="flex flex-col  cursor-pointer"
              onClick={() =>
                type == "now playing" || type == "top rated"
                  ? navigate(`/movie/${typeMovie}/${items.id}`)
                  : navigate(`/serial/${items.id}`)
              }
            >
              <img
                className="rounded-lg   sm:w-[30vw] h-60 w-[35vw]    sm:h-72   md:w-[25vw] md:h-[22rem] "
                key={items.id}
                src={backpath}
                alt={items.original_title}
              ></img>
              <h4 className="font-bold  text-black/70 lg:text-base md:text-sm text-xs">
                {items.original_title}
              </h4>
              <h4 className="text-black/60 lg:text-base md:text-sm text-xs">
                {items.release_date}
              </h4>
            </div>
          );
        }
      })}
    </>
  );
}

export default MovieCarosalList;
