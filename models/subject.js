'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Question, { foreignKey: 'subject_id', targetKey: 'id' });
      this.hasMany(models.PaperSet, { foreignKey: 'subject_id', targetKey: 'id' });
      this.hasOne(models.Exam, { foreignKey: 'subject_id', targetKey: 'id' });
    }
  }
  Subject.init({
    subjectName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'subject',
    paranoid: true,
  });
  return Subject;
};