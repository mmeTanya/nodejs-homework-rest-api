const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { basedir } = global;

const { User } = require(`${basedir}/models`);
const { sendEmail } = require(`${basedir}/helpers`);

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click to confirm registration</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email: result.email,
        name: result.name,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
        verificationToken: result.verificationToken
      },
    },
  });
};

module.exports = signup;
