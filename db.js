const { Client } = require("pg");

const connectionString = process.env.DATABASE_URI;

const db = new Client({
    connectionString,
});

module.exports = db;
