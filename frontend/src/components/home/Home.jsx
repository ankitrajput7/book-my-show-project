import PromotionCarosal from "./PromotionCarosal";
import MoviesCarosal from "./movieCarosal/MoviesCarosel";

function Home() {
  return (
    <div className="">
      <PromotionCarosal />
      <MoviesCarosal type={"now playing"}/>
      <img
        className="px-24 py-4"
        src={
          "https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"
        }
        alt="bmsPromotionPoster"
      ></img>
      <MoviesCarosal type={"top rated"}/>
      <MoviesCarosal type={"tv serial"}/>
    </div>
  );
}

export default Home;
