"use strict"
const { Model, Sequelize } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class PaperSet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			PaperSet.belongsTo(models.Subject, {
				foreignKey: "subject_id",
				targetKey: "id",
				as: "subjects",
			})
			PaperSet.hasMany(models.Question, {
				foreignKey: "paper_set_id",
				sourceKey: "id",
				as: "questions",
			})
			PaperSet.hasMany(models.ExamUserMapping, {
				foreignKey: "paper_set_id",
				sourceKey: "id",
				as: "exam_users",
			})
		}
		toJSON() {
			return {
				...this.get(),
				createdAt: undefined,
				updatedAt: undefined,
				deletedAt: undefined,
			}
		}
	}
	PaperSet.init(
		{
			subject_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "subject",
					key: "id",
				},
				field: "subject_id",
			},
		},
		{
			sequelize,
			modelName: "PaperSet",
			tableName: "paper_set",
			paranoid: true,
		}
	)
	return PaperSet
}
