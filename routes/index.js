const express = require('express')
const router = express.Router()
const Controller = require('../controllers')


router.get('/courses', Controller.getCourses)
router.get('/', Controller.getCourses)

module.exports = router;