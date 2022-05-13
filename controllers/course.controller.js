const CourseModel = require("../models/course.model");

const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllCourses = async (req, res) => {
  const courses = await CourseModel.find().select();
  res.status(200).json(courses);
};

module.exports.create = async (req, res) => {
  const {
    title,
    description,
    dayDuration,
    picture,
    nameTeacher,
    status,
    removed,
    learners,
  } = req.body;
  try {
    const course = await CourseModel.create({
      title,
      description,
      dayDuration,
      picture,
      nameTeacher,
      status,
      removed,
      learners,
    });
    res.status(200).json({ course: course._id });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateCourse = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);

  await CourseModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        dayDuration: req.body.dayDuration,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  );
};

module.exports.deleteCourse = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await CourseModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.disableCourse = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  await CourseModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  );
};

module.exports.enableCourse = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  await CourseModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: req.body.status,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  );
};

exports.getCourseActiver = (req, res) => {
  CourseModel.find({ status: true }, (error, data) => {
    if (error || !CourseModel) {
      return res.status(400).json({
        error: "Course Does Not Exists",
      });
    }
    return res.status(200).json(data);
  });
};
