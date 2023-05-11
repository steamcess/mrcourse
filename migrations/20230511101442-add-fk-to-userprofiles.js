'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addConstraint('UserProfiles', {
      fields: ['username'],
      type: "foreign key",
      name: 'fkeyUserId',
      references: {
        table: 'Users',
        fields: ['username']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('UserProfiles', 'fkeyUserId');
  }
};
