import Express from "express";
import cors from "cors";
import userRouter from "./src/routers/user/userRoute.js";
import tmdbRouter from "./src/routers/tmdb/tmdbRoute.js";
export const app = Express();

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/tmdb", tmdbRouter);

/**
 * listening server on port number 3000
 */
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
