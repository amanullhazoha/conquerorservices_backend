const path = require("path");
const User = require("../user/user.model");
const nodemailer = require("../../config/emailService/config");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../config/lib/jwtHelper");
const {
	sendPasswordResetEmail,
} = require("../../config/emailService/template");
const {
	generateAccessToken,
} = require("../../config/lib/accessTokenGenerator");
const {
	hashPassword,
	comparePassword,
} = require("../../config/lib/hashFunction");
const EmailVerifyToken = require(path.join(
	process.cwd(),
	"src/modules/user/emailVerifyToken.model"
));

const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(404).send("You have no account.");
		}

		// Compare password
		const match = await comparePassword(password, user.password);

		if (!match) {
			return res.status(404).send("Invalid credentials.");
		}

		// Generate access token
		const access_token = generateAccessToken(user);

		// Send success response
		return res.status(201).send({ user, access_token });
	} catch (error) {
		console.log(error);

		// Forward the error to the error handling middleware
		next(error);
	}
};

const userSignUp = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const passwordHashed = await hashPassword(password);

		const [user, created] = await User.findOrCreate({
			where: { email },
			defaults: { password: passwordHashed, role: "super admin" },
		});

		if (!created) return res.status(400).send("You already have and account.");

		res.status(201).send({
			message: "user create successfully",
			data: {
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);

		next(error);
	}
};

const userForgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user)
			return res.status(404).send("You have no account on this email.");

		let currentDate = new Date();
		let expire_date = new Date(currentDate.getTime() + 5 * 60000);

		const alreadySended = await EmailVerifyToken.findOne({
			where: { created_by: user.id },
		});

		if (alreadySended) {
			await EmailVerifyToken.destroy({ where: { created_by: user.id } });
		}

		const emailVerifyToken = await EmailVerifyToken.create({
			expire_date,
			email: user.email,
			created_by: user.id,
		});

		const token = jwt.sign(
			{
				userId: user?.id,
				emailVerifyTokenId: emailVerifyToken.id,
			},
			process.env.COOKIE_PARSER_TOKEN,
			{
				expiresIn: process.env.COOKIE_EXPIRE_TIME,
			}
		);

		nodemailer(sendPasswordResetEmail({ to: user.email, token }));

		res.status(201).send({
			message: "Verify link sent on your mail successfully",
			data: {
				expire_date,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);

		next(error);
	}
};

const userPasswordReset = async (req, res, next) => {
	try {
		const { password, token } = req.body;

		const decodedUser = verifyToken(token, process.env.COOKIE_PARSER_TOKEN);

		const user = await User.findOne({ where: { id: decodedUser.userId } });

		if (!user) return res.status(404).send("User not found by this email.");

		const emailVerifyToken = await EmailVerifyToken.findOne({
			where: { id: decodedUser.emailVerifyTokenId },
		});

		if (!emailVerifyToken) return res.status(404).send("Token is not valid.");

		if (new Date(emailVerifyToken.expire_date).getTime() < new Date().getTime())
			return res.status(400).send("Token time is expire.");

		const hashedPassword = await hashPassword(password);

		const userData = {
			password: hashedPassword,
		};

		await user.update(userData);

		await EmailVerifyToken.destroy({ where: { created_by: user.id } });

		const response = {
			code: 200,
			message: "Password reset successfully.",
			data: user,
			links: req.path,
		};

		res.status(200).json(response);
	} catch (error) {
		console.log(error);

		next(error);
	}
};

// const userEmailVerify = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email, password } });

//     if (!user) return res.status(404).send("Credential is not valid");

//     res.status(201).send(user);
//   } catch (error) {
//     console.log(error);

//     next(error);
//   }
// };

module.exports = {
	userLogin,
	userSignUp,
	//   userEmailVerify,
	userPasswordReset,
	userForgotPassword,
};
