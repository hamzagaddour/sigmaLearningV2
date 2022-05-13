const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

module.exports.uploadCourse = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.title + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../client/public/uploads/${fileName}`
    )
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.courseId,
      { $set: { picture: "./uploads/" + fileName } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      res.json({uploaded : docs})
      
    );
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
