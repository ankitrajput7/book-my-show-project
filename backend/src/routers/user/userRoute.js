import Express from "express";
import dbConnQuery from "../../../dbConnection.js";
import jsonwebtoken from "jsonwebtoken";
import { verifyLoginToken } from "../../utils/middleware.js";
import { apiResponseMessage } from "../../utils/helperFunctions.js";
import dotenv from "dotenv";
dotenv.config();
const userRouter = Express.Router();
import { sendMail } from "../../utils/middleware.js";

/**
 * * register a new user
 */
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const [user] = await dbConnQuery(`select * from users where email=?`, [
      email,
    ]);

    if (user) {
      throw new Error("User already exist.");
    }
    await dbConnQuery(
      `insert into users(name, email, password, mobile) values(?,?,?,?)`,
      [name, email, password, mobile]
    );

    sendMail(email, "Verification mail", "Verification otp is 0000");

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

      let headers = { algorithm: "HS512" };
      let loginToken = jsonwebtoken.sign(
        { id: user.id },
        process.env.jsonWebTokenSecretKey,
        { ...headers, expiresIn: "12h" }
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
 * * add movie id to watchlist
 */
userRouter.post("/add/watchlist", verifyLoginToken, async (req, res) => {
  try {
    const movieId = req.query.movieId;
    const data = await dbConnQuery(
      "select * from watchlist where movieID=? and userId=?",
      [movieId, req.user.id]
    );

    if (data.length > 0) {
      res.send(apiResponseMessage(200, "Already in watch list.", true));
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

/**
 * remove movies from playlist
 */
userRouter.delete("/remove/watchlist", verifyLoginToken, async (req, res) => {
  try {
    const movieId = req.query.movieId;
    await dbConnQuery("delete from watchlist where userID=? and movieID=?", [
      req.user.id,
      movieId,
    ]);

    res.send(apiResponseMessage(200, "Movie removed successfully.", true));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * send password reset link on users registered mail
 */
userRouter.post("/send/password/reset/link", async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await dbConnQuery("select id from users where email = ?", [
      email,
    ]);
    if (!user) {
      throw new Error("Mail is not registered.");
    }

    const passwordResetToken = jsonwebtoken.sign(
      { id: user.id },
      process.env.jsonWebTokenSecretKey,
      { expiresIn: "1h" }
    );

    const url = `http://localhost:1234/change/password/${passwordResetToken}`;
    sendMail(email, "Password reset link.", url);

    res.send(
      apiResponseMessage(
        200,
        "Link successfully sended on registered mailId.",
        true
      )
    );
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * reset password of the user
 */
userRouter.put("/change/password", verifyLoginToken, async (req, res) => {
  try {
    const { password } = req.body;

    await dbConnQuery("update users set password=? where id=?", [
      password,
      req.user.id,
    ]);

    res.send(apiResponseMessage(200, "Password updated successfully.", true));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

export default userRouter;
