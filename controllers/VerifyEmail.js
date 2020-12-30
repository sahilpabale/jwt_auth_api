const jwt = require("jsonwebtoken");
const db = require("../db");

const verifyEmail = async (req, res) => {
  try {
    token = req.params.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const email = decoded.email;

    const email_verify = await db.query(
      `SELECT is_verified FROM users WHERE email='${email}';`,
    );

    if (email_verify.rows[0].is_verified) {
      res.status(404).json({
        status: "failed",
        message: "You are already verified!",
      });
    }

    const result = await db.query(
      `UPDATE users SET is_verified='true' WHERE email='${email}';`,
    );

    res.status(200).json({
      status: "success",
      message: `Successfully verified ${email}`,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Verification token is incorrect! Try again.",
      error,
    });
  }
};
module.exports = verifyEmail;
