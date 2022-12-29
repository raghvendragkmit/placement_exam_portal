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
      Question.hasMany(models.Answer, { foreignKey: 'question_id', sourceKey: 'id', as:'answers'});
      Question.hasMany(models.ExamUserResponse, { foreignKey: 'question_id', sourceKey: 'id' ,as:'exam_user_responses'});
      Question.belongsTo(models.PaperSet, { foreignKey: 'paper_set_id', targetKey:'id',as:'paper_sets' })
    }
    
  }
  Question.init({
    question_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    paper_set_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "paper_set",
        key: 'id'
      },
    },
    
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'question',
    paranoid: true
  });
  return Question;
};