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
      this.belongsTo(models.Subject, { foreignKey: 'subject_id', targetKey: 'id' });

    }
  }
  Exam.init({
    subject_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "subject",
        key: 'id'
      }
    },
    exam_start_time: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    exam_end_time: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    exam_duration: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Exam',
    tableName: 'exam',
    paranoid:true
  });
  return Exam;
};