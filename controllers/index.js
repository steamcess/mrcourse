const { SelectedCourse, Course, Category, User, UserProfile } = require("../models")
const { Op } = require('sequelize') // untuk sort filter
const bcrypt = require('bcrypt');
const {changeFormat} = require('../helpers/changeNumberFormat')
const {formatDate} = require('../helpers/formatDate')


class Controller {

  static buy (req, res) {
    const {CourseId} = req.params;
    // console.log(CourseId)
    let a = req.session.username;
    let UserProfileId;
    UserProfile.findOne({ where: { username: a }})
      .then(user => {
        UserProfileId = user.id
        return SelectedCourse.create({CourseId, UserProfileId})
      })
      .then(() =>{
        res.redirect(`/students/courses`)
      })
      .catch(err =>{
        console.log(err)
        res.send(err)
    })
  }

  static delete (req, res) {
    const {CourseId} = req.params;
    // console.log(CourseId)
    let a = req.session.username;
    console.log(a)
    let UserProfileId;
    UserProfile.findOne({ where: { username: a }})
      .then(user => {
        UserProfileId = user.id
        return SelectedCourse.destroy({ where: { CourseId: CourseId, UserProfileId: UserProfileId }})
      })
      .then((result) =>{
        // res.send(result)
        res.redirect(`/students/courses`)
      })
      .catch(err =>{
        console.log(err)
        res.send(err)
    })
  }

  static studentCourses(req, res){
    const {UserProfileId} = req.params;
    let a = req.session.username;
    UserProfile.findOne({
      where: {username: a},  include: {
        model: SelectedCourse,
        include: Course
      }
    })
    .then(result =>{
      res.render("list-studentCourse", {result, changeFormat})
    })
    .catch(err =>{
      console.log(err)
  })
  }

  static dashboardStud (req, res) {
    let whereOption = Course.getCourseByCourseName(req.query)

    // const searchOption = req.query.courseName || 'all'
    // let whereOption = {}

    // if (searchOption !== 'all') {
    //   whereOption = {
    //     '$courseName$': { [Op.like]: `%${searchOption}%` },
    //   };
    // }

    Course.findAll({where: whereOption})
    .then(courses =>{
        // res.send(courses)
        res.render("dashboardStudents", {courses, changeFormat, formatDate})
    })
    .catch(err =>{
        console.log(err)
    })
  }

  static dashboardTeach (req, res) {
    UserProfile.findAll({
      include: {
        model: SelectedCourse,
        include: Course
      }
    })
    .then(bulkData =>{
      res.render("dashboardTeach", {bulkData})
    })
    .catch(err =>{
      console.log(err)
  })
  }

  static getCourses(req, res){
    UserProfile.findAll({
      include: {
        model: SelectedCourse,
        include: Course
      }
    })
    .then(result =>{
      res.send(result)
    })
    .catch(err =>{
      console.log(err)
  })
  }

  // static studentCourses(req, res){
  //   SelectedCourse.create(){

  //   }
  // }



  static home (req, res) {
    Course.findAll()
    .then(courses =>{
        // res.send(courses)
        res.render("home", {courses, changeFormat})
    })
    .catch(err =>{
        console.log(err)
    })
  }

  static courseDetail(req, res){
    // let a = req.session.username;
    // console.log(a)
    const {id} = req.params
    Course.findByPk(id)
    .then(course => {
      // res.send(course)
      res.render("courseDetail", {course, changeFormat})
    })
    .catch(err =>{
      res.send(err)
  })
  }

  static dashboard (req, res) {
    UserProfile.findAll({
      include: {
        model: SelectedCourse,
        include: Course
      }
    })
    .then(bulkData =>{
      res.render("dashboard", {bulkData, changeFormat})
    })
    .catch(err =>{
      console.log(err)
  })
  }

  static loginGet (req, res) {
    res.render("login")
  }

  static loginPost (req, res) {
    let {username, password} = req.body
    const plainPassword = password
    let allError = []
    User.findOne({ where: { username: username }})
      .then(user => {
        if (!user) {
          let error = 'Username tersebut tidak ada'
          allError.push(error)
          res.render("loginError", {allError})
          return
        }

        let hashedPassword = user.password

        console.log(hashedPassword, password, '<<<< ini katanya')
        bcrypt.compare(plainPassword, hashedPassword)
          .then((result) => {
            if (result) {
              req.session.username = user.username
              if (user.role === "student") {
                res.redirect("/dashboard/students")
              } else {
                res.redirect("/dashboard/teachers")
              }

              // console.log('Password matched! COCOK COCOK');
              // res.redirect("/regProfiles")
            } else {
              console.log('Password did not match!');
              res.redirect("/login")
            }
          })
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          err.errors.map(e => allError.push(e.message))
          res.render("loginError", {allError})
        } else {
          res.send(err)
        }
      });
  }

  static regGet (req, res) {
    res.render("reg")
  }

  static regPost(req, res) {
    let { username, password, role } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.send(err);
      }

      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          return res.send(err);
        }

        let newUser = { username, password: hashedPassword, role };
        console.log(newUser)
        User.create(newUser)
          .then(() => {
            res.redirect("/login")
          })
          .catch(err => {
            if (err.name == "SequelizeValidationError") {
              const error = err.errors.map(e => e.message)
              res.render("regError", {error})
            } else {
              res.send(err)
            }
          });
      });
    });
  }

  static regProfilesGet (req, res) {
    console.log(req.session.username, '<<< ini di regProfilesGet')
    res.render("regProfiles")
  }

  static regProfilesPost (req, res) {
    let { name, gender, education, experience } = req.body
    console.log(req.session.username, '<<< ini di regProfilesPost')
    let newUserProfiles = { name, gender, education, experience, username: req.session.username }

    UserProfile.create(newUserProfiles)
      .then(() => {
        res.redirect("/dashboard/students")
      })
      .catch(err => {
        if (err.name == "SequelizeValidationError") {
          const error = err.errors.map(e => e.message)
          res.render("regProfilesError", {error})
        } else {
          res.send(err)
        }
      })
  }

  static logout (req, res) {
    req.session.destroy(err => {
      if (err) {
        console.log(err)
      } else {
        res.redirect("/login")
      }
    })
  }


  static editProfileGet (req, res) {
    let username = req.session.username;

    UserProfile.findOne({ where: { username: username } })
      .then((user) => {
        res.render("editProfile", { user });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static editProfilePost (req, res) {
    let { name, gender, education, experience } = req.body
    let username = req.session.username

    UserProfile.findOne({ where: { username: username } })
      .then((user) => {
        user.name = name
        user.gender = gender
        user.education = education
        user.experience = experience

        return user.save()
      })
      .then(() => {
        res.redirect("/dashboard/students")
      })
      .catch((err) => {
        res.send(err);
      });
  }









}

module.exports = Controller

