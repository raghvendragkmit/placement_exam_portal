'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaperSetQuestionMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Question, { foreignKey: 'question_id', targetKey: 'id' });
      this.belongsTo(models.PaperSet, { foreignKey: 'paper_set_id', targetKey: 'id' });
    }
  }
  PaperSetQuestionMapping.init({
    paperSetId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "paper_set",
        key: 'id'
      }
    },
    questionId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "question",
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'PaperSetQuestionMapping',
    tableName: 'paper_set_question_mapping',
    paranoid: true,
  });
  return PaperSetQuestionMapping;
};