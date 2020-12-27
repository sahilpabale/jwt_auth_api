const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
    try {
        // get user creds
        const { email, password } = req.body;

        // check whether user exists
        const user = await db.query(
            `SELECT * FROM users where email='${email}';`
        );
        if (!user.rows[0].is_verified) {
            res.status(404).json({
                status: "failed",
                message:
                    "Your account is not verified! Try verifying your email!",
            });
        } else {
            if (user.rowCount) {
                const hashPass = user.rows[0].password;
                // hash password
                const passMatch = await bcrypt.compare(password, hashPass);
                if (passMatch) {
                    // sign jwt and send token
                    const token = await jwt.sign(
                        { id: user.rows[0].id },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1h",
                        }
                    );

                    res.status(200).json({
                        status: "success",
                        message: `${user.rows[0].full_name} you are logged in successfully!`,
                        token: token,
                    });
                } else {
                    res.status(404).json({
                        status: "failed",
                        message: "Email and Password don't match! Try again",
                    });
                }
            } else {
                res.status(404).json({
                    status: "failed",
                    message: "User not found! Try again",
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = Login;
