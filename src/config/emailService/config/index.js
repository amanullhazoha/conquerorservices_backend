const nodemailer = require("nodemailer");

module.exports = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SENDER_HOST,
      port: parseInt(process.env.EMAIL_SENDER_PORT, 10),
      secure: true,
      tls: { rejectUnauthorized: false },
      auth: {
        user: process.env.EMAIL_SENDER_ACCOUNT,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      ...options,
      from: process.env.EMAIL_SENDER_ACCOUNT,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
