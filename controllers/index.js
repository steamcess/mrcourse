const {Course, Category} = require('../models')

class Controller{
    static getCourses(req, res){
        Course.findAll()
        .then(courses =>{
            // res.send(courses)
            res.render('list-course', {courses})
        })
        .catch(err =>{
            res.send(err)
        })
    }
}

module.exports = Controller;