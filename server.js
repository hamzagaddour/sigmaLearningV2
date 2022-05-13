const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");


//Import les Routers
const userRoutes = require('./routes/user.routes')
const courseRoutes =require('./routes/course.routes')
const chapterRoutes = require('./routes/chapterRoutes')
const qcmRoutes = require ('./routes/qcmRoutes')
const questionRoutes = require ('./routes/questionRoutes')
const {checkUser, requireAuth} = require('./middleware/auth.middleware');


const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// exe Routes
app.use('/api/user', userRoutes)
app.use('/api/course',courseRoutes)
app.use('/api/chapter', chapterRoutes)
app.use('/api/qcm', qcmRoutes)
app.use('/api/question', questionRoutes)



app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
