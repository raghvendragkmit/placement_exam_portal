"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("paper_set", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.literal("uuid_generate_v4()"),
			},

			subject_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: "subject",
					key: "id",
				},
			},

			paper_set_name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			marks_per_question: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("paper_set")
	},
}
