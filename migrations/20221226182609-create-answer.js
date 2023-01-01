"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("answer", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
			},
			answer_description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			question_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "question",
					key: "id",
				},
			},
			is_correct: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE,
				defaultValue: null,
			},
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("answer")
	},
}
