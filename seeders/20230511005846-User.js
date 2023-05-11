'use strict';
const fs = require("fs")

let data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))

data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
