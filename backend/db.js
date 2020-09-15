const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "194519",
  host: "localhost",
  port: 6000,
  database: "test"
});

module.exports = pool;
