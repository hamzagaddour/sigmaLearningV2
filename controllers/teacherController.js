const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;



module.exports.getAllTeacher = (req, res) => {
    console.log(req.params);
    UserModel.find({ isTeacher : true }).exec((error, userData) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          error: "No User Found",
        });
      }
  
      res.json(userData);
    });
  };