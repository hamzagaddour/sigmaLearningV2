const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  //console.log(req.params)
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  console.log(req.body);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.data.firstName,
        lastName: req.body.data.lastName,
        email: req.body.data.email,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  );
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.getAllLearner = (req, res) => {
  UserModel.find({ isAdmin: false, isTeacher: false }).exec((error, userData) => {
    if (error) {
      return res.status(400).json({
        error: "No User Found",
      });
    }

    res.json(userData);
  });
};

module.exports.desactiverLearner = (req, res) => {
  const user = new UserModel();
  user._id = req.body.id;
  user.active = req.body.active
  console.log(user);
  //const {name,lastName,email, password} = req.body
  var conditions = { _id: req.body.id };

  UserModel.updateOne(conditions, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

module.exports.activerLearner = async(req, res) => {
 console.log(req.params);
 console.log(req.body);
  if (!ObjectID.isValid(req.params.idLearner))
  return res.status(400).send("ID unknown: " + req.params.id)

  await UserModel.findByIdAndUpdate(
    { _id: req.params.idLearner },
    {
      $set: {
        active: req.body.active,
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true },
    (err, docs) => {
      if (!err) return res.send(docs);
      if (err) return res.status(500).send({ message: err });
    }
  )

};


/*module.exports.getAllTeacher = (req, res) => {
  UserModel.find({ isTeacher: true }).exec((error, userData) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "No User Found",
      });
    }

    res.json(userData);
  });
};*/

module.exports.getAllTeachers = async (req, res) => {
  const users = await UserModel.find().select({isTeacher :true});
  res.status(200).json(users);
};
