const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const userController = require ('../controllers/user.controller.js')
const teacherController = require('../controllers/teacherController')


//authentification
router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)

// user DB
router.get("/", userController.getAllLearner);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/desactiverlearnerbyid/:idLearner",userController.desactiverLearner)
router.put("/activerlearnerbyid/:idLearner",userController.activerLearner)
router.get("/getallteacher/:id", teacherController.getAllTeacher)

//router.get("/getalllearner", userController.getAllLearner)





module.exports = router;