import mysql from "mysql2";
import util from "util";

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ankit@123@",
  database: "bookmyshow",
  port: 3310,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL database");
  connection.release();
});

const dbConnQuery = util.promisify(pool.query).bind(pool);
export default dbConnQuery;

/**
 * code to connect with mysql with xxamp(mysql server)
 * if we use this code we get error :- (Client does not support authentication protocol requested by server; consider upgrading MySQL client)
 */

// import mysql from "mysql";
// import util from "util";

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Ankit@123@",
//   database: "bookmyshow",
//   port: 3310,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// const dbConnQuery = util.promisify(connection.query).bind(connection);
// export default dbConnQuery;
