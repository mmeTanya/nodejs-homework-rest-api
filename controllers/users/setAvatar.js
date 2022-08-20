const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { basedir } = global;
const { User } = require(`${basedir}/models/user`);

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;

    await Jimp.read(tempPath)
      .then((image) => {
        return image.resize(250, 250).quality(100).write(tempPath);
      })
      .catch((err) => {
        console.error(err);
      });

    const [extension] = originalname.split(".").reverse();
    const newName = `${_id}.${extension}`;
    const uploadPath = path.join(avatarsDir, newName);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(201).json({
      status: "success",
      code: 200,
      message: "avatar was updated succes",
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = setAvatar;
