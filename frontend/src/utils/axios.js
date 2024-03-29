import axios from "axios";
import { allUrls } from "./constants";

/**
 ** send data to register api
 */
export const registerUserApi = async (userData) => {
  try {
    const { data } = await axios({
      method: "post",
      url: allUrls.registerUser,
      data: userData,
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 ** send data to login api
 */
export const loginUserApi = async (userData) => {
  try {
    const { data } = await axios({
      method: "post",
      url: allUrls.loginUser,
      data: userData,
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * get a user data api
 */
export const getUserDataApi = async () => {
  try {
    const token = localStorage.getItem("loginToken");

    const { data } = await axios({
      method: "get",
      url: allUrls.getUserData,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * *get now playing movies
 */
export const getNowPlayingMoviesApi = async (page = 1) => {
  try {
    let url = `${allUrls.getMovies}`;
    const { data } = await axios({
      method: "get",
      url: url,
      params: { page: page },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * Get top rated movies
 */
export const getTopRatedMoviesApi = async (page = 1) => {
  try {
    const url =  allUrls.getTopratedMovies;

    const { data } = await axios({
      method: "get",
      url: url,
      params: { page: page },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * Get TV serials
 */
export const getTvSerialApi = async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: allUrls.getTvSerial,
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * get city of the user
 */
export const getCityOfUserApi = async (geoLocation) => {
  try {
    let url = `${allUrls.getLocation}${geoLocation.latitude}%2C${geoLocation.longitude}`;

    const data = await axios({
      method: "get",
      url,
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * get movie by movie id
 */
export const getMovieByIdApi = async (id) => {
  try {
    const { data } = await axios({
      method: "get",
      url: allUrls.getMovieById,
      params: { id: id },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/***
 * *search movie by text
 */
export const searchMovieByTextApi = async (text) => {
  try {
    const { data } = await axios({
      method: "get",
      url: allUrls.searchByText,
      params: { searchText: text },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/***
 * *add movie to the playlist
 */
export const addMovieToPlayListApi = async (id) => {
  try {
    const token = localStorage.getItem("loginToken");

    const { data } = await axios({
      method: "post",
      url: allUrls.addToWatchList,
      params: { movieId: id },
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * get List of watchlist movies
 */
export const getWatchListMoviesApi = async () => {
  try {
    const token = localStorage.getItem("loginToken");
    const { data } = await axios({
      method: "get",
      url: allUrls.getWatchList,
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * get series details
 */
export const getSeriesDetailsApi = async (id) => {
  try {
    const { data } = await axios({
      method: "get",
      url: allUrls.getSeriesDetail,
      params: { id },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * remove movie from watchlist
 */
export const removeFromWatchlistApi = async (movieId) => {
  try {
    const { data } = await axios({
      method: "delete",
      headers: {
        Authorization: `bearer ${localStorage.getItem("loginToken")}`,
      },
      url: allUrls.removeFromWatchlist,
      params: { movieId },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * remove movie from watchlist
 */
export const changePasswordApi = async (token, password) => {
  try {
    const { data } = await axios({
      method: "put",
      headers: {
        Authorization: `bearer ${token}`,
      },
      url: allUrls.changePassword,
      data: { password },
    });

    return data;
  } catch (error) {
    return error;
  }
};
