const fs = require("fs");
const path = require("path");

const emailVerifyMailForApplicant = ({ email, user_name, otp, message }) => {
	return {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		to: email,
		text: message,
		subject: "Email verification for applicant",
		html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #333;">Email Verification OTP code</h2>
        <p>Hi ${user_name}</p>

		<h3>${otp}</h3>

        <p>Thank you!</p>
      </div>
    `,
	};
};

const verifySuccessMail = ({ email, user_name, message }) => {
	// if (!fs.existsSync(path.join(__dirname, '../../assets/files/services-rival.pdf'))) {
	//   console.error('PDF file not found at:');
	//   return;
	// }

	// const bufferFile = fs.readFileSync(path.join(__dirname, '../../assets/files/services-rival.pdf'));

	return {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		text: message,
		to: email,
		subject: `${user_name} successfully verified`,
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
const sendPasswordResetEmail = ({ to, token }) => {
	const resetLink = `${process.env.FRONTEND_BASE_URL}/forgot-password?token=${token}&step=2 `;

	const mailOptions = {
		from: process.env.EMAIL_SENDER_ACCOUNT,
		to: to,
		text: "Password Reset Request",
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

	return mailOptions;
};

module.exports = {
	verifySuccessMail,
	sendPasswordResetEmail,
	emailVerifyMailForApplicant,
};
