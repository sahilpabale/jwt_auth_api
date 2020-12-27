const db = require("../db");
const bcrypt = require("bcrypt");
const sendMail = require("./SendMail");

const Register = async (req, res) => {
    try {
        // get user creds
        const { full_name, email, password } = req.body;

        // check whether user exists
        const userCheck = await db.query(
            `SELECT * FROM users where email='${email}'`
        );

        if (!userCheck.rowCount) {
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            // add user to DB
            const result = await db.query(
                `INSERT INTO users (full_name, email, password) VALUES ('${full_name}', '${email}', '${hashedPassword}') RETURNING *;`
            );

            sendMail(email, full_name);

            res.status(200).json({
                status: "success",
                message: `Thanks for registering! Please verify you email before logging in!`,
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "User already registered! Try again",
            });
        }
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error,
        });
    }
};

module.exports = Register;
