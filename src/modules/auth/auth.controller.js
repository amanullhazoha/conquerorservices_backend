const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const { generatePassword, generateRefCode } = require("../core/utilities");
const nodemailer = require("../../config/emailService/config");
const { verifyToken } = require("../../config/lib/jwtHelper");
const {
  oneTimePassword,
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

const getUserMailCheck = async (req, res, next) => {
  try {
    const email = req?.query?.email;

    const options = { email };

    if (!email)
      return res.status(400).json({ message: "Please input a email first" });

    const user = await User.findOne({ where: options });

    if (user)
      return res.status(404).json({ message: "This email already used" });

    // if (jobApplicant)
    //   return res.status(404).json({ message: "This email already used" });

    res.status(200).json({ message: "Email is not user", data: user });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("You have no account.");
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(404).send("Invalid credentials.");
    }

    const access_token = generateAccessToken(user);

    return res.status(201).send({ user, access_token });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const userSignUp = async (req, res, next) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    const passwordHashed = await hashPassword(password);

    console.log();

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        last_name,
        first_name,
        role: "super_admin",
        password: passwordHashed,
        name: `${first_name} ${last_name}`,
      },
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

    nodemailer(
      sendPasswordResetEmail({
        token,
        to: user.email,
        user_name: user?.full_name,
      })
    );

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

const getRefreshToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req?.user?.email } });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const refresh_token = generateAccessToken(user);

    return res.status(200).send({ refresh_token });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const agentRegistration = async (req, res, next) => {
  try {
    let nid_back_page;
    let profile_image;
    let resident_visa;
    let nid_front_page;
    let passport_front_page;
    let business_license_copy;
    let passport_special_page;

    if (req?.files?.nid_back_page) {
      nid_back_page = req?.files?.nid_back_page[0]?.filename;
    }

    if (req?.files?.passport_special_page) {
      passport_special_page = req?.files?.passport_special_page[0]?.filename;
    }

    if (req?.files?.profile_image) {
      profile_image = req?.files?.profile_image[0]?.filename;
    }
    if (req?.files?.resident_visa) {
      resident_visa = req?.files?.resident_visa[0]?.filename;
    }
    if (req?.files?.nid_front_page) {
      nid_front_page = req?.files?.nid_front_page[0]?.filename;
    }
    if (req?.files?.passport_front_page) {
      passport_front_page = req?.files?.passport_front_page[0]?.filename;
    }
    if (req?.files?.business_license_copy) {
      business_license_copy = req?.files?.business_license_copy[0]?.filename;
    }

    const {
      email,
      phone,
      full_name,
      nationality,
      passport_no,
      is_agree,
      spouse,
      alt_phone,
      father_name,
      mother_name,
      facebook_id,
      whatsapp_no,
      telegram_id,
      reference_name,
      marital_status,
      spouse_contact_no,
    } = req.body;

    const password = generatePassword();
    const passwordHashed = await hashPassword(password);

    const nameParts = full_name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts?.length - 1] || firstName;

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        phone,
        email,
        full_name,
        nationality,
        passport_no,
        is_agree,

        spouse,
        alt_phone,
        father_name,
        mother_name,
        facebook_id,
        whatsapp_no,
        telegram_id,
        reference_name,
        marital_status,
        spouse_contact_no,

        passport_front_page,
        passport_special_page,
        nid_front_page,
        nid_back_page,
        profile_image,
        resident_visa,
        business_license_copy,

        password: passwordHashed,
        registration_type: "agent",
        refer_code: generateRefCode("1998", firstName, lastName, phone),
      },
    });

    if (!created)
      return res.status(400).json({ message: "You already have and account." });

    nodemailer(
      oneTimePassword({
        password,
        to: email,
        user_name: full_name,
        refer_code: user?.refer_code,
      })
    );

    res.status(201).json({
      message: "Agent registration successfully",
      data: {
        email: user?.email,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const employeeRegistration = async (req, res, next) => {
  try {
    let nid_back_page;
    let profile_image;
    let resident_visa;
    let nid_front_page;
    let passport_front_page;
    let business_license_copy;
    let passport_special_page;

    if (req?.files?.nid_back_page) {
      nid_back_page = req?.files?.nid_back_page[0]?.filename;
    }

    if (req?.files?.passport_special_page) {
      passport_special_page = req?.files?.passport_special_page[0]?.filename;
    }

    if (req?.files?.profile_image) {
      profile_image = req?.files?.profile_image[0]?.filename;
    }
    if (req?.files?.resident_visa) {
      resident_visa = req?.files?.resident_visa[0]?.filename;
    }
    if (req?.files?.nid_front_page) {
      nid_front_page = req?.files?.nid_front_page[0]?.filename;
    }
    if (req?.files?.passport_front_page) {
      passport_front_page = req?.files?.passport_front_page[0]?.filename;
    }
    if (req?.files?.business_license_copy) {
      business_license_copy = req?.files?.business_license_copy[0]?.filename;
    }

    const {
      phone,
      email,
      last_name,
      first_name,
      nationality,
      is_agree,
      date_of_birth,

      nid_number,
      spouse,
      father_name,
      mother_name,
      passport_no,
      emirates_id,
      whatsapp_no,
      uae_resident,
      marital_status,
      spouse_contact_no,
      passport_expiry_date,
      emirates_expiry_date,

      position_id,
      department,
    } = req.body;

    const password = generatePassword();
    const passwordHashed = await hashPassword(password);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        phone,
        email,
        last_name,
        first_name,
        full_name: `${first_name} ${last_name}`,
        nationality,
        is_agree,
        date_of_birth,

        nid_number,
        spouse,
        father_name,
        mother_name,
        passport_no,
        emirates_id,
        whatsapp_no,
        uae_resident,
        marital_status,
        spouse_contact_no,
        passport_expiry_date,
        emirates_expiry_date:
          uae_resident === "true" ? emirates_expiry_date : null,

        position_id,
        department,

        passport_front_page,
        passport_special_page,
        nid_front_page,
        nid_back_page,
        profile_image,
        resident_visa,
        business_license_copy,

        password: passwordHashed,
        registration_type: "employee",
        refer_code: generateRefCode(
          date_of_birth,
          first_name,
          last_name,
          phone
        ),
      },
    });

    if (!created)
      return res.status(400).json({ message: "You already have and account." });

    nodemailer(
      oneTimePassword({
        to: email,
        user_name: `${first_name} ${last_name}`,
        password,
        refer_code: user?.refer_code,
      })
    );

    res.status(201).json({
      message: "Employee registration successfully",
      data: {
        email: user?.email,
      },
    });
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
  getUserMailCheck,
  getRefreshToken,
  agentRegistration,
  employeeRegistration,
  //   userEmailVerify,
  userPasswordReset,
  userForgotPassword,
};
