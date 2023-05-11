const { User } = require("../models")
const { Op } = require('sequelize') // untuk sort filter
const bcrypt = require('bcrypt');

class Controller {

  static home (req, res) {
    res.render("home")
  }

  static dashboard (req, res) {
    res.render("dashboard")
  }

  static loginGet (req, res) {
    res.render("login")
  }

  // static loginPost (req, res) {
  //   let {username, password} = req.body
  //
  //   User.findOne({ username: username })
  //     .then(user => {
  //       console.log(user)
  //       if (user.password === password) {
  //         res.send('cocok')
  //       } else {
  //         res.send('password salah')
  //       }
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // }

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
              console.log('Password matched! COCOK COCOK');
              res.render("dashboard")
            } else {
              console.log('Password did not match!');
              res.redirect("/")
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

  // static regPost (req, res) {
  //   let {username, password} = req.body;
  //
  //   User.findOne({username: username})
  //     .then(user => {
  //       console.log(user, '<<<< ini user Baru Reg')
  //       if (user) {
  //         res.send("Username already exists");
  //       } else {
  //         // Hash password before saving user to the database
  //         bcrypt.genSalt(10, function(err, salt) {
  //           bcrypt.hash(password, salt, function(err, hash) {
  //             if (err) throw err;
  //
  //             let newUser = new User({
  //               username: username,
  //               password: hash
  //             });
  //
  //             newUser.save()
  //               .then(() => {
  //                 res.redirect('/masuk');
  //               })
  //               .catch(err => {
  //                 res.send(err);
  //               });
  //           });
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       res.send(err);
  //     });
  // }

  // static regPost (req, res) {
  //   let {username, password} = req.body;
  //
  //   let newUser = {username, password}
  //
  //   User.create(newUser)
  //     .then(() => {
  //       res.redirect("/")
  //     })
  //     .catch(err => {
  //       res.send(err)
  //     })
  // }

  static regPost(req, res) {
    let { username, password } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.send(err);
      }

      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          return res.send(err);
        }

        let newUser = { username, password: hashedPassword };
        console.log(newUser)
        User.create(newUser)
          .then(() => {
            res.redirect("/dashboard")
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


}

module.exports = Controller

//berhasil
// static loginPost (req, res) {
//   let {username, password} = req.body
//
//   User.findOne({ username: username })
//     .then(user => {
//       console.log(user)
//       if (user.password === password) {
//         res.send('cocok')
//       } else {
//         res.send('password salah')
//       }
//     })
//     .catch(err => {
//       res.send(err);
//     });
// }
