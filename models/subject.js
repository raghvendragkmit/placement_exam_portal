'use strict';
const { Model, Sequelize } = require('sequelize');
// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subject.hasMany(models.PaperSet, {
        foreignKey: 'subject_id',
        sourceKey: 'id',
        as: 'paper_sets'
      });
      Subject.hasMany(models.Exam, {
        foreignKey: 'subject_id',
        sourceKey: 'id',
        as: 'exams'
      });
    }
  }
  Subject.init(
    {
      subject_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      }
    },
    {
      sequelize,
      modelName: 'Subject',
      tableName: 'subject',
      paranoid: true
    }
  );
  return Subject;
};
