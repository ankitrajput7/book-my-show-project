import Express from "express";
import dbConnQuery from "../../../dbConnection.js";
import jsonwebtoken from "jsonwebtoken";
import { verifyLoginToken } from "../../utils/middleware.js";
import { apiResponseMessage } from "../../utils/helperFunctions.js";
import dotenv from "dotenv";
dotenv.config();
const userRouter = Express.Router();

/**
 * * register a new user
 */
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const [userExist] = await dbConnQuery(
      `select * from users where email='${email}'`
    );

    if (userExist) {
      throw new Error("User already exist.");
    }

    dbConnQuery(
      `insert into users(name, email, password, mobile) values(?,?,?,?)`,
      [name, email, password, mobile]
    );

    res.send(apiResponseMessage(201, "New user created successfully.", true));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * login a user
 */
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await dbConnQuery(
      `select * from users where email="${email}"`
    );

    if (!user) {
      throw new Error("User not exists.");
    } else {
      if (user.password !== password) {
        throw new Error("Incorrect password.");
      }

      let loginToken = jsonwebtoken.sign(
        { id: user.id },
        process.env.jsonWebTokenSecretKey
      );

      res.send(
        apiResponseMessage(200, "Login successful.", true, [{ loginToken }])
      );
    }
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * delete a user
 */
userRouter.delete("/delete", verifyLoginToken, async (req, res) => {
  try {
    await dbConnQuery(`delete from users where id='${req?.user?.id}'`);

    res.send(
      apiResponseMessage(200, "User account deleted successfully.", true)
    );
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * get user data
 */
userRouter.get("/data", verifyLoginToken, async (req, res) => {
  try {
    let { id } = req.user;

    let [data] = await dbConnQuery(
      `select id, name, email from users where id = ?`,
      [id]
    );

    res.send(
      apiResponseMessage(200, "User data fetched successfully.", true, data)
    );
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * * add movie id to playlist
 */
userRouter.post("/add/watchlist", verifyLoginToken, async (req, res) => {
  try {
    const movieId = req.query.movieId;
    const data = await dbConnQuery("select * from watchlist where movieID=?", [
      movieId,
    ]);

    if (data.length > 0) {
      throw new Error("Already in watch list.");
    } else {
      await dbConnQuery("insert into watchlist(movieID, userID) values(?,?)", [
        movieId,
        req.user.id,
      ]);

      res.send(apiResponseMessage(200, "Movie added successfully.", true));
    }
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

export default userRouter;
