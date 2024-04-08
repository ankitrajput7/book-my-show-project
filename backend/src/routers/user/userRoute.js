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
    const [user] = await dbConnQuery(`SELECT * FROM users WHERE email=?`, [
      email,
    ]);

    if (user) {
      throw new Error("User already exist.");
    }
    await dbConnQuery(
      `INSERT INTO users(fullName, email, password, mobile) VALUES(?,?,?,?)`,
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
      `SELECT * FROM users WHERE email="${email}"`
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
        { ...headers, expiresIn: "7d" }
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
    await dbConnQuery(`DELETE FROM users WHERE id='${req?.user?.id}'`);

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
      `SELECT id, fullName AS name FROM users WHERE id = ?`,
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
      "SELECT * FROM watchlist WHERE movieID=? AND userId=?",
      [movieId, req.user.id]
    );

    if (data.length > 0) {
      res.send(apiResponseMessage(200, "Already in watch list.", true));
    } else {
      await dbConnQuery("INSERT INTO watchlist(movieID, userID) VALUES(?,?)", [
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
    await dbConnQuery("DELETE FROM watchlist WHERE userID=? and movieID=?", [
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
userRouter.put("/send/password/reset/link", async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await dbConnQuery("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    if (!user) {
      throw new Error("Mail is not registered.");
    }

    await dbConnQuery(
      "UPDATE users SET requested_reset_password=? WHERE email=?",
      [true, email]
    );

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

    let [data] = await dbConnQuery("SELECT * FROM users WHERE id=?", [
      req.user.id,
    ]);

    if (!data.requested_reset_password) {
      throw new Error("Reset link expired.");
    }

    await dbConnQuery(
      "UPDATE users SET password=? , requested_reset_password=? WHERE id=?",
      [password, false, req.user.id]
    );

    res.send(apiResponseMessage(200, "Password updated successfully.", true));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * rating and review any movie or serial
 */
userRouter.post("/ratemovie", verifyLoginToken, async (req, res) => {
  try {
    const { movieId, review, rating } = req.body;
    const userId = req.user.id;

    let data = await dbConnQuery(
      "SELECT * FROM reviews WHERE movieId=? AND userId=?",
      [movieId, userId]
    );

    if (data.length > 0) {
      throw new Error("Already reviewed.");
    }

    await dbConnQuery(
      "INSERT INTO reviews(movieId, rating, review, userId) VALUES(?,?,?,?)",
      [movieId, rating, review, userId]
    );

    res.send(apiResponseMessage(201, "Review added.", true));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

/**
 * get reviews of movies based on movieId
 */
userRouter.get("/getReviews", async (req, res) => {
  try {
    let data = await dbConnQuery(
      "SELECT reviewId,userId rating, reviewDate,review, fullName  FROM reviews INNER JOIN users ON reviews.userId = users.id WHERE movieId=?",
      [req.query.movieId]
    );

    const overallRating = Math.round(
      data?.reduce((rating, review) => {
        return rating + review?.rating;
      }, 0) / data?.length
    );

    data = { results: data, reviewCount: data.length ,overallRating};
    res.send(apiResponseMessage(200, "reviews data fetched.", true, data));
  } catch (error) {
    res.send(apiResponseMessage(500, error.message));
  }
});

export default userRouter;
