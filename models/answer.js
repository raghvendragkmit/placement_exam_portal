'use strict';
const {
  Model, Sequelize
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
      Answer.belongsTo(models.Question, { foreignKey: 'questionId', targetKey: 'id', as:'questions' });
      Answer.hasMany(models.ExamUserResponse, { foreignKey: 'answer_id', sourceKey: 'id',as:'exam_user_responses' });
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined, deletedAt: undefined }
    }
  }
  Answer.init({
    answer_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    question_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "question",
        key: 'id'
      },
    },
    is_correct: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answer',
    paranoid: true
  });
  return Answer;
};