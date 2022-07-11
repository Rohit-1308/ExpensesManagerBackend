const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ error: "user already exits" });
  }
  try {
    user = User.create({
      name,
      email,
      password,
    });
    console.log("k");

    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, log: "Unable to create user" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    console.log({ email });

    return res
      .status(404)
      .json({ success: false, message: "user does not exits" });
  }
  try {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      sendToken(user, 200, res);
      // return res.status(201).json({success:true})
    } else {
      return res.status(400).json({ success: false, token: null });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, log: "Internal server error" });
  }
};

const sendToken = (user, statuscode, res) => {
  const token = user.getSignedToken();

  return res.status(statuscode).json({ success: true, token });
};
