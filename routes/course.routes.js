const router = require('express').Router()
const courseController = require ('../controllers/course.controller')
const uploadController = require('../controllers/uploadController')
const multer = require("multer");
const upload = multer();


//authentification
router.post("/create", courseController.create)
//router.post("/login", authController.signIn)
//router.get("/logout", authController.logout)

// user DB
router.get("/", courseController.getAllCourses)
router.get("/getenablecourse", courseController.getCourseActiver)
router.get("/getallcourse", courseController.getAllCourses);
//router.get("/:id", userController.userInfo);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
router.put("/enablecourse/:id", courseController.enableCourse)
router.put("/disableCourse/:id", courseController.disableCourse)

// upload
router.post("/upload", upload.single("file"), uploadController.uploadCourse);




module.exports = router;