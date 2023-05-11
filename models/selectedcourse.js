'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SelectedCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SelectedCourse.belongsTo(models.UserProfile);
      SelectedCourse.belongsTo(models.Course);
    }
  }
  SelectedCourse.init({
    UserProfileId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SelectedCourse',
  });
  return SelectedCourse;
};