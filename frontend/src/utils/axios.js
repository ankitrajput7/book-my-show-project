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
export const getNowPlayingMoviesApi = async (page) => {
  try {
    let url = `${allUrls.getMovies}`;
    const { data } = await axios({
      method: "get",
      url: url,
      params: { page: page || 14 },
    });

    return data;
  } catch (error) {
    return error;
  }
};

/**
 * * Get top rated movies
 */
export const getTopRatedMoviesApi = async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: allUrls.getTopratedMovies,
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
