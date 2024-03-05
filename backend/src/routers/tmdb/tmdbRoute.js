import Express from "express";
import axios from "axios";
const tmdbRouter = Express();
import { apiResponseMessage } from "../../utils/helperFunctions.js";
import { OPTIONS } from "../../utils/constants.js";
import { verifyLoginToken } from "../../utils/middleware.js";
import dbConnQuery from "../../../dbConnection.js";

/**
 * * Get a list of movies that are currently in theatres.
 */
tmdbRouter.get("/get/movies", async (req, res) => {
  try {
    let { page } = req?.query;

    const url = `https://api.themoviedb.org/3/movie/now_playing?language=hi-IN&page=${page}&region=IN`;
    let { data } = await axios({ method: "GET", url, ...OPTIONS });

    res.send(apiResponseMessage(200, "now playing movies fetched", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * Get a list of movies that are currently in theatres.
 */
tmdbRouter.get("/toprated/movies", async (req, res) => {
  try {
    let { page } = req?.query;

    const url = `https://api.themoviedb.org/3/movie/popular?language=hi-IN&page=${page}&region=IN`;
    let { data } = await axios({ method: "GET", url, ...OPTIONS });

    res.send(apiResponseMessage(200, "top rated movies fetched", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * Get a list of TV serials
 */
tmdbRouter.get("/tvserial", async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2";
    let { data } = await axios({ method: "GET", url, ...OPTIONS });

    res.send(apiResponseMessage(200, "serial data fetched", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * search movie by movie id
 */
tmdbRouter.get("/get/movie", async (req, res) => {
  try {
    let id = req?.query?.id;

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    let { data } = await axios({ method: "GET", url, ...OPTIONS });

    res.send(apiResponseMessage(200, "movie data fetched.", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * search movie by text
 */
tmdbRouter.get("/search", async (req, res) => {
  try {
    let searchText = req.query.searchText;

    const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=hi-IN&page=1&region=IN`

    let { data } = await axios({ method: "GET", url, ...OPTIONS });

    res.send(apiResponseMessage(200, "search results.", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/***
 * * get list of watch list movies
 */
tmdbRouter.get("/watchlist", verifyLoginToken, async (req, res) => {
  try {
    const userID = req.user.id;
    let movieIds = await dbConnQuery(
      "select movieID from watchlist where userID=?",
      [userID]
    );

    let movies = [];
    async function fetchMovie(id) {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        const { data } = await axios({ method: "GET", url, ...OPTIONS });

        if (data.code === "ECONNRESET") {
          fetchMovie(id);
        }
        return data;
      } catch (error) {
        return error;
      }
    }

    for (let movie of movieIds) {
      let response = await fetchMovie(movie?.movieID);
      movies.push(response);
    }
    // movies.sort((a, b) => {
    //   return a.title.localeCompare(b.title);
    // });

    res.send(
      apiResponseMessage(200, "Watch list search results.", true, movies)
    );
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * get details of tv series
 */
tmdbRouter.get("/series", async (req, res) => {
  try {
    let { id } = req?.query;
    let url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

    let { data } = await axios({
      method: "GET",
      url,
      ...OPTIONS,
    });

    res.send(apiResponseMessage(200, "Details fetched.", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

export default tmdbRouter;
