const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { basedir } = global;

const { User } = require(`${basedir}/models`);

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        name: result.name,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    },
  });
};

module.exports = signup;
