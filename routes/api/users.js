const express = require("express");
const { basedir } = global;
const { auth, validation, ctrlWrapper } = require(`${basedir}/middlewares`);
const { users: ctrl } = require(`${basedir}/controllers`);
const { joiSubscriptionSchema } = require(`${basedir}/models/user`);

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
    "/",
    auth,
    validation(joiSubscriptionSchema),
    ctrlWrapper(ctrl.updateSubscription)
  );

module.exports = router;
