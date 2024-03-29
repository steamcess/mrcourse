const Controller = require("../controllers/index")
const router = require("express").Router()
const session = require("express-session")

// router.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next()
// })

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// router.use((req, res, next) => {
//   if(!req.session.username) {
//     res.redirect("/login")
//   } else {
//     next()
//   }
// })


const userLoggedIn = function (req, res, next) {
  if(!req.session.username) {
    res.redirect("/login")
  } else {
    console.log(req.session.username,'<<< username dia')
    next()
  }
}

const regId = function (req, res, next) {
  console.log(req.session.theuser)
  next()
}

router.get("/",  Controller.home)

router.get("/login", Controller.loginGet)
router.post("/login", Controller.loginPost)

router.get("/logout", Controller.logout)

router.get("/reg", Controller.regGet)
router.post("/reg", Controller.regPost)

router.get("/regProfiles", userLoggedIn, Controller.regProfilesGet)
router.post("/regProfiles", userLoggedIn, Controller.regProfilesPost)

router.get("/dashboard", userLoggedIn, Controller.dashboard)
router.get("/courseDetail/:id", userLoggedIn, Controller.courseDetail)

// router.get('/courses', Controller.getCourses)
router.get('/dashboard/students', userLoggedIn, Controller.dashboardStud)
router.get('/dashboard/teachers', userLoggedIn, Controller.dashboardTeach)
router.get('/buy/:CourseId', userLoggedIn, Controller.buy)
// router.get('/dashboard/students/')
router.get('/students/courses', userLoggedIn, Controller.studentCourses)
router.get("/editProfile", userLoggedIn, Controller.editProfileGet)
router.post("/editProfile", userLoggedIn, Controller.editProfilePost)
router.get('/delete/:CourseId', userLoggedIn, Controller.delete)

module.exports = router
