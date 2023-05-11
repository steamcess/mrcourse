'use strict';
const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./data/courses.json', 'utf-8'))
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
}); 


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Courses', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Courses', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
