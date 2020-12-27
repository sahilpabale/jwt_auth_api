const db = require("../db");
const jwt = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(" ")[1];

    const decoded = await jwt.verify(bearerToken, process.env.JWT_SECRET);

    const user_id = decoded.id;
    let user = await db.query(`SELECT * FROM users where id='${user_id}'`);
    user = user.rows[0];
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // token is expired and redirect to login
      res.status(404).json({
        status: "failed",
        message: "Token is expired! Please login to access this route",
      });
      next();
    }
    res.json(err);
  }
};

module.exports = checkAuth;
