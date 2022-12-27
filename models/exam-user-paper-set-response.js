'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamUserPaperSetResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ExamUserPaperSetMapping, { foreignKey: 'exam_user_paper_set_mapping_id', targetKey: 'id' });
      this.belongsTo(models.Question, { foreignKey: 'question_id', targetKey: 'id' });
      this.belongsTo(models.Answer, { foreignKey: 'answer_id', targetKey: 'id' });
      
    }
  }
  ExamUserPaperSetResponse.init({
    examUserPaperSetMappingId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "exam_user_paper_set_mapping",
        key: 'id'
      }
    },

    questionId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "question",
        key: 'id'
      },
    },

    answerId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "answer",
        key: 'id'
      },
    },
  }, {
    sequelize,
    modelName: 'ExamUserPaperSetResponse',
    tableName: 'exam_user_paper_set_response',
    paranoid: true
  });
  return ExamUserPaperSetResponse;
};