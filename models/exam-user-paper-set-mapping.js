'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamUserPaperSetMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Exam, { foreignKey: 'examId', targetKey: 'id' });
      this.belongsTo(models.PaperSet, { foreignKey: 'paperSetId', targetKey: 'id' });
      this.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id' });
      this.hasMany(models.ExamUserPaperSetResponse, { foreignKey: 'examUserPaperSetMappingId',targetKey:'id' });
    }
  }
  ExamUserPaperSetMapping.init({
    examId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "exam",
        key: 'id'
      },
      field:'exam_id'

    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "user",
        key: 'id'
      },
      field:'user_id'
    },

    paperSetId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "paper_set",
        key: 'id'
      },
      field:'paper_set_id'
    },

    attemptTime: {
      allowNull: true,
      type: Sequelize.DATE,
      field:'attempt_time'
    },


    submitTime: {
      allowNull: true,
      type: Sequelize.DATE,
      field:'submit_time'
    },

    totalQuestions: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field:'total_questions'
    },

    totalQuestionAttempted: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field:'total_question_attempted'
    },

    marksObtained: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
      field:'marks_obtained'
    },

    result: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      field:'result'
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
    modelName: 'ExamUserPaperSetMapping',
    tableName: 'exam_user_paper_set_mapping'
  });
  return ExamUserPaperSetMapping;
};