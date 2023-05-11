'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'hashedpassword', Sequelize.STRING);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'hashedpassword');
  }
};
