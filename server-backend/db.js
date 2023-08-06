const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "protec"
});

connection.connect(err => {
  if (err) {
    console.error("Error during the database connection", err);
    process.exit(1); // Termina l'applicazione in caso di errore nella connessione al database
  }
  console.log("Successfully connected to the database");
});

module.exports = { connection };