const { Client } = require("pg");

const connectionString = process.env.DATABASE_URL;

const db = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
