var mysql = require('mysql');

module.exports = mysql.createConnection({
  host: "localhost",
  user: "asianetAdmin",
  password: "asianetAdmin101",
  database: "asianet"
});

