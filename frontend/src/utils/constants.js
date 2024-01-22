export const baseUrl = "http://localhost:3000/";

export const TMDB_BASE_URL = "https://image.tmdb.org/t/p/w200";

export const promotionCarosalImageUrl = [
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1701341192680_anjunadeep1240x300.jpg",
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1703162228341_web.jpg",
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1703248143141_1240x300.jpg",
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1702122896357_gauravwebindore.jpg",
];

export const allUrls = {
  registerUser: `${baseUrl}user/register`,
  loginUser: `${baseUrl}user/login`,
  getUserData: `${baseUrl}user/data`,
  getMovies: `${baseUrl}tmdb/get/movies`,
  getTopratedMovies: `${baseUrl}tmdb/toprated/movies`,
  getTvSerial: `${baseUrl}tmdb/tvserial`,
  getLocation: `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=QAl8wE8EC2pGZ5eNW763HNdTYMLANrXT&q=`,
  getMovieById: `${baseUrl}tmdb/get/movie`,
  searchByText: `${baseUrl}tmdb/search`,
  addToWatchList: `${baseUrl}user/add/watchlist`,
  getWatchList: `${baseUrl}tmdb/watchlist`,
};
