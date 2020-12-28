const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SendMail = async (email, full_name) => {
  try {
    // sign email as token in jwt which expiresIn 15 mins
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: 15 * 60,
    });
    // send mail to 'email' specified

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: "Mail - Sahil Pabale <mail@sahilpabale.me>", // sender address
      to: email, // list of receivers
      subject: `${full_name} verify your account!`, // Subject line
      html: `
        <h1>Verify your account</h1>
        <p>Click the link below to verify your account.</p><br>
        <a href="${process.env.APP_URL}/api/verify/${token}" target="_blank">Click here</a>
        <br><br>
        <small>The link will expire in 10 mins!</small>
        `, // html body
    });
    return info;
  } catch (error) {
    return error;
  }
};

module.exports = SendMail;
