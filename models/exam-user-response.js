'use strict';
const { Model, Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class ExamUserResponse extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			ExamUserResponse.belongsTo(models.ExamUserMapping, {
				foreignKey: 'exam_user_attempt_id',
				targetKey: 'id',
				as: 'exam_user_attempt',
			});
			ExamUserResponse.belongsTo(models.Question, {
				foreignKey: 'question_id',
				targetKey: 'id',
				as: 'questions',
			});
			ExamUserResponse.belongsTo(models.Answer, {
				foreignKey: 'answer_id',
				targetKey: 'id',
				as: 'answers',
			});
		}
	}
	ExamUserResponse.init(
		{
			exam_user_attempt_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'exam_user_mapping',
					key: ' id',
				},
			},

			question_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'question',
					key: 'id',
				},
			},

			answer_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'answer',
					key: 'id',
				},
			},

			is_correct: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
		},
		{
			sequelize,
			modelName: 'ExamUserResponse',
			tableName: 'exam_user_response',
			paranoid: true,
		}
	);
	return ExamUserResponse;
};
