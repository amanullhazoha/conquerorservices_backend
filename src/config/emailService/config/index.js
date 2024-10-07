const nodemailer = require("nodemailer");

module.exports = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SENDER_HOST,
      port: parseInt(process.env.EMAIL_SENDER_PORT, 10), // Ensure port is an integer
      secure: true, // Use true for 465, false for other ports
      tls: { rejectUnauthorized: false },
      auth: {
        user: process.env.EMAIL_SENDER_ACCOUNT,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });

    // Create mail options
    const mailOptions = {
      ...options,
      from: process.env.EMAIL_SENDER_ACCOUNT,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

  } catch (error) {
    // Handle errors here
    console.error("Error sending email:", error);
  }
};
