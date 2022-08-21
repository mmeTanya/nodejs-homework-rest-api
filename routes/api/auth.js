const express = require("express");
const { basedir } = global;
const { auth, validation, ctrlWrapper } = require(`${basedir}/middlewares`);
const { sendEmail } = require(`${basedir}/helpers`);
const { auth: ctrl } = require(`${basedir}/controllers`);
const { joiRegisterSchema, joiLoginSchema, joiEmailSchema } = require(`${basedir}/models/user`);

const router = express.Router();

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.signup)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post("/verify", validation(joiEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
