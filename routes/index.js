const Controller = require("../controllers/index")
const router = require("express").Router()

router.get("/", Controller.home)

router.get("/login", Controller.loginGet)
router.post("/login", Controller.loginPost)

router.get("/reg", Controller.regGet)
router.post("/reg", Controller.regPost)

router.get("/dashboard", Controller.dashboard)

module.exports = router
