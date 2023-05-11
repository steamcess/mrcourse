'use strict';
const { Op } = require('sequelize') 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Category)
      Course.hasMany(models.SelectedCourse)
    }

    static getCourseByCourseName(object){
      const searchOption = object.courseName || 'all'
      let whereOptions = {};
      if(searchOption !== 'all'){
        whereOptions.courseName = {[Op.iLike] : `%${searchOption}%`}
        return whereOptions;
      } else {
        return whereOptions
      }
    }

    // get TeacherTitle(){
      
    // }
    
  }
  Course.init({
    courseName: DataTypes.STRING,
    description: DataTypes.TEXT,
    courseRating: DataTypes.INTEGER,
    teacher: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};