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
      this.belongsTo(models.Exam, { foreignKey: 'exam_id', targetKey: 'id' });
      this.belongsTo(models.PaperSet, { foreignKey: 'paper_set_id', targetKey: 'id' });
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id' });

      this.hasMany(models.ExamUserPaperSetResponse, { foreignKey: 'exam_user_paper_set_mapping_id',targetKey:'id' });
    }
  }
  ExamUserPaperSetMapping.init({
    examId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "exam",
        key: 'id'
      }
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "user",
        key: 'id'
      }
    },

    paperSetId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "paper_set",
        key: 'id'
      }
    },

    attemptTime: {
      allowNull: true,
      type: Sequelize.DATE
    },


    submitTime: {
      allowNull: true,
      type: Sequelize.DATE
    },

    totalQuestions: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    totalQuestionAttempted: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    marksObtained: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    result: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
    },
  }, {
    sequelize,
    modelName: 'ExamUserPaperSetMapping',
    tableName: 'exam_user_paper_set_mapping'
  });
  return ExamUserPaperSetMapping;
};