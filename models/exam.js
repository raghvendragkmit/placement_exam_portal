'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subjectId', targetKey: 'id' });
      this.belongsToMany(models.User, { through: models.ExamUserPaperSetMapping, foreignKey: 'examId' });
    }
  }
  Exam.init({
    subjectId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "subject",
        key: 'id'
      },
      field:'subject_id'
    },
    examStartTime: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field:'exam_start_time'
    },
    examEndTime: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field:'exam_end_time'
    },
    examDuration: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field:'exam_duration'
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
    modelName: 'Exam',
    tableName: 'exam',
    paranoid:true
  });
  return Exam;
};