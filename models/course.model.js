const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      max: 3064,
    },
    picture: {
      type: String,
      default: "random-course.png",
    },
    dayDuration: {
      type: String,
    },
    nameTeacher:{
      type: String,
    },
    status: {
      type: Boolean,
    },
    removed: {
      type: Boolean,
    },
    learners : {
      type : Array,
    },
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("course", courseSchema);

module.exports = CourseModel;
