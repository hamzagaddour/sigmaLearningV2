const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://"+process.env.DB_USER_PASS+"@cluster0.3d6er.mongodb.net/sigma-learning?retryWrites=true&w=majority"
).then(()=> console.log('Connected to db'))
.catch(()=> console.log('failed Connect to db'))
