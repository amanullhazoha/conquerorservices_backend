const User = require("./user.model");

const getUserReferCodeCheck = async (req, res, next) => {
  try {
    const code = req?.query?.code;

    if (!code)
      return res.status(400).json({ message: "Please input your refer code" });

    const user = await User.findOne({ where: { refer_code: code } });

    if (!user)
      return res.status(404).json({ message: "This refer code is not exist" });

    res.status(200).json({ refer_code: user?.refer_code });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getUserReferCodeCheck,
};
