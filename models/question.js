'use strict';
const {
  Model,Sequelize
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
      this.belongsTo(models.Subject, { foreignKey: 'subject_id', targetKey: 'id' });
      this.hasMany(models.Answer, { foreignKey: 'question_id', targetKey: 'id' });
      this.hasMany(models.ExamUserPaperSetResponse, { foreignKey: 'question_id', targetKey: 'id' });
      this.belongsToMany(models.PaperSet, { through: models.PaperSetQuestionMapping, foreignKey: 'question_id' })

    }
  }
  Question.init({
    question_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subject_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "subject",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'question',
    paranoid: true
  });
  return Question;
};