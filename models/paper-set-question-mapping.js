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
      this.belongsTo(models.Question, { foreignKey: 'questionId', targetKey: 'id' });
      this.belongsTo(models.PaperSet, { foreignKey: 'paperSetId', targetKey: 'id' });
    }
  }
  PaperSetQuestionMapping.init({
    paperSetId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "paper_set",
        key: 'id'
      },
      field:'paper_set_id'
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
    modelName: 'PaperSetQuestionMapping',
    tableName: 'paper_set_question_mapping',
    paranoid: true,
  });
  return PaperSetQuestionMapping;
};