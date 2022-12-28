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
      this.belongsTo(models.ExamUserPaperSetMapping, { foreignKey: 'examUserPaperSetMappingId', targetKey: 'id' });
      this.belongsTo(models.Question, { foreignKey: 'questionId', targetKey: 'id' });
      this.belongsTo(models.Answer, { foreignKey: 'answerId', targetKey: 'id' });
      
    }
  }
  ExamUserPaperSetResponse.init({
    examUserPaperSetMappingId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "exam_user_paper_set_mapping",
        key: 'id'
      },
      field:'exam_user_paper_set_mapping_id'
    },

    questionId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "question",
        key: 'id'
      },
      field:'question_id'
    },

    answerId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "answer",
        key: 'id'
      },
      field:'answer_id'
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      // defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      // defaultValue: Sequelize.NOW,
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
    modelName: 'ExamUserPaperSetResponse',
    tableName: 'exam_user_paper_set_response',
    paranoid: true
  });
  return ExamUserPaperSetResponse;
};