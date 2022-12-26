'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exam_user_paper_set_mapping', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      exam_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "exam",
          key: 'id'
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "user",
          key: 'id'
        }
      },

      paper_set_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "paper_set",
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('exam_user_paper_set_mapping');
  }
};