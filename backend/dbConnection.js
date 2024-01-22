import mysql from "mysql";
import util from "util"

const dbConnection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "bookmyshow",
});

dbConnection.connect((err) => {
  if (!err) {
    console.log("Connected to the MySQL DB.");
  } else {
    console.log("Connection Failed", err);
  }
});

const dbConnQuery = util.promisify(dbConnection.query).bind(dbConnection);
export default dbConnQuery;
