const { basedir } = global;

const { User } = require(`${basedir}/models`);

const { createError } = require(`${basedir}/helpers`);

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate( _id, { subscription }, { new: true });
  if (!result) {
    throw createError(404, `user with id=${_id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateSubscription;
