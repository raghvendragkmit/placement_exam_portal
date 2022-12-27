'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Question, { foreignKey: 'question_id', targetKey: 'id' });
      this.hasMany(models.ExamUserPaperSetResponse, { foreignKey: 'answer_id', targetKey: 'id' });

    }
  }
  Answer.init({
    answerDescription: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    questionId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "question",
        key: 'id'
      }
    },
    isCorrect: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answer',
    paranoid:true
  });
  return Answer;
};