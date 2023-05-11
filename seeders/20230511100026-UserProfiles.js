'use strict';
const fs = require("fs")

let data = JSON.parse(fs.readFileSync("./data/userprofiles.json", "utf-8"))

data.forEach(el => {
  el.totalCourse = 0
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserProfiles', data, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
