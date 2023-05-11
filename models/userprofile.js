'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.hasMany(models.SelectedCourse)
      UserProfile.belongsTo(models.User, {
        foreignKey: 'username'
      })
    }

    get title(){
      if (this.gender == "male"){
        return `Mr. ${this.name}`
      } else {
        return `Mrs. ${this.name}`
      }
    }
  }
  UserProfile.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    education: DataTypes.STRING,
    experience: DataTypes.STRING,
    totalCourse: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    
    username: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
       

        if (instance.education == 'SMA') {
          instance.experience = `[Tamatan SMA]: Berpengalaman ${instance.experience} `
        } else if (instance.education == 'S1') {
          instance.experience = `[Tamatan S1]: Berpengalaman ${instance.experience} `
        } else if (instance.education == 'S2') {
          instance.experience = `[Tamatan S2]: Berpengalaman ${instance.experience} `
        } else {
          instance.experience = `[Tamatan S3]: Berpengalaman ${instance.experience} `
        }

      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};
