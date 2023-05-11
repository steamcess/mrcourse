'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addConstraint('SelectedCourses', {
      fields: ['UserProfileId'],
      type: "foreign key",
      name: 'fkeyUserProfileId',
      references: {
        table: 'UserProfiles',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('SelectedCourses', 'fkeyUserProfileId');
  }
};
