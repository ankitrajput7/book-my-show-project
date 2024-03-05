import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

/**
 * function for verifying user login token
 */
export async function verifyLoginToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.slice(7);
    const tokenData = jsonwebtoken.verify(
      token,
      process.env.jsonWebTokenSecretKey
    );

    // console.log(tokenData)
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

/**
 * function for sending mail to users
 */
export function sendMail(email, subject, message) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodemailerUser,
      pass: process.env.nodemailerPass,
    },
  });

  let mailDetails = {
    from: process.env.nodemailerUser,
    to: email,
    subject: subject,
    text: message,
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.error("Error in sending mail");
    } else {
      console.log("Email send successfully to" , email);
    }
  });
}
