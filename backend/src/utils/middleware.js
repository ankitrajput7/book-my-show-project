import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifyLoginToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.slice(7);
    const tokenData = jsonwebtoken.verify(token, process.env.jsonWebTokenSecretKey);

    console.log(tokenData)
    req.user = tokenData;
    next();
  } catch (error) {
    res.send({
      statusCode: "401 Unauthorized",
      message: error.message,
      status: false,
      data: [],
    });
  }
}
