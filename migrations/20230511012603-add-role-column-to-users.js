'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'role', Sequelize.STRING);
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'role');
  }
};
