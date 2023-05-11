'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addConstraint('SelectedCourses', 
    {
      fields: ['CourseId'],
      type: "foreign key",
      name: 'fkeyCourseId',
      references: {
        table: 'Courses',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('UserProfiles', 'fkeyCourseId');
  }
};
