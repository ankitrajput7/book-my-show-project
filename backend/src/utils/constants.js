import dotenv from "dotenv";
dotenv.config();

export const OPTIONS = {
  headers: {
    accept: "application/json",
    Authorization: process.env.TMDBbearerToken,
  },
};
