'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subjectId', targetKey: 'id' });
      this.hasMany(models.Answer, { foreignKey: 'questionId', targetKey: 'id' });
      this.hasMany(models.ExamUserPaperSetResponse, { foreignKey: 'questionId', targetKey: 'id' });
      this.belongsToMany(models.PaperSet, { through: models.PaperSetQuestionMapping, foreignKey: 'questionId' })
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined, deletedAt: undefined }
    }
  }
  Question.init({
    questionDescription: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'question_description'
    },
    subjectId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "subject",
        key: 'id'
      },
      field: 'subject_id'
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
    modelName: 'Question',
    tableName: 'question',
    paranoid: true
  });
  return Question;
};