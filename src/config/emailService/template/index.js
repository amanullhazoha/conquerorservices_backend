const fs = require("fs");
const path = require("path");

const emailVerifyMail = (email, user_name, message) => {
	// if (!fs.existsSync(path.join(__dirname, '../../assets/files/services-rival.pdf'))) {
	//   console.error('PDF file not found at:');
	//   return;
	// }

	// const bufferFile = fs.readFileSync(path.join(__dirname, '../../assets/files/services-rival.pdf'));

	return {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		text: message,
		to: email,
		subject: `${user_name} successfully join us`,
		// attachments: [
		//   {
		//     content: bufferFile,
		//     contentType: 'application/pdf',
		//     filename: 'services-rival.pdf',
		//   },
		// ],
	};
};

const verifySuccessMail = (email, user_name, message) => {
	// if (!fs.existsSync(path.join(__dirname, '../../assets/files/services-rival.pdf'))) {
	//   console.error('PDF file not found at:');
	//   return;
	// }

	// const bufferFile = fs.readFileSync(path.join(__dirname, '../../assets/files/services-rival.pdf'));

	return {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		text: message,
		to: email,
		subject: `${user_name} successfully join us`,
		// attachments: [
		//   {
		//     content: bufferFile,
		//     contentType: 'application/pdf',
		//     filename: 'services-rival.pdf',
		//   },
		// ],
	};
};

// Send email function
async function sendPasswordResetEmail(to, token) {
	const resetLink = `${process.env.FRONTEND_BASE_URL}/reset-password?token=${token}`;

	const mailOptions = {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		to: to,
		subject: "Password Reset Request",
		html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi,</p>
        <p>We received a request to reset your password. You can reset your password by clicking the button below:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
        <p>Thank you!</p>
      </div>
    `,
	};

	// Send email
	let info = await transporter.sendMail(mailOptions);
	console.log("Message sent: %s", info.messageId);
}

module.exports = {
	emailVerifyMail,
	verifySuccessMail,
  sendPasswordResetEmail
};
