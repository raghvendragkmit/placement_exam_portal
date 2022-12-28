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
      this.hasMany(models.Question, { foreignKey: 'subjectId', targetKey: 'id' });
      this.hasMany(models.PaperSet, { foreignKey: 'subjectId', targetKey: 'id' });
      this.hasOne(models.Exam, { foreignKey: 'subjectId', targetKey: 'id' });
    }
  }
  Subject.init({
    subjectName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      field:'subject_name'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at'
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: null,
      field: 'deleted_at'
    }
  }, {
    sequelize,
    modelName: 'Subject',
    tableName: 'subject',
    paranoid: true,
  });
  return Subject;
};