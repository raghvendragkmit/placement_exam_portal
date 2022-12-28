'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaperSet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Subject, { foreignKey: 'subject_id', targetKey: 'id' });
      this.belongsToMany(models.Question, { through: models.PaperSetQuestionMapping, foreignKey: 'paper_set_id' });
      this.hasMany(models.ExamUserPaperSetMapping, { foreignKey: 'paper_set_id', targetKey: 'id' });

    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined, deletedAt: undefined }
    }
  }
  PaperSet.init({
    subjectId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "subject",
        key: 'id'
      },
      field: 'subject_id'
    },

  }, {
    sequelize,
    modelName: 'PaperSet',
    tableName: 'paper_set',
    paranoid: true
  });
  return PaperSet;
};