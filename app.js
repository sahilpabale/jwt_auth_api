const express = require("express");
require("dotenv").config();
const db = require("./db");
const router = require("./routes/index");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

app.get("/", (req, res) => {
  res.redirect("/api");
});

db.connect()
  .then(console.log("DB connected"))
  .catch((err) => console.log("Error connecting to DB" + err));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
