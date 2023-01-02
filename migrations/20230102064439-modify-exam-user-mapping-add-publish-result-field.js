'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'exam_user_mapping', // table name
      'publish_result', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('exam_user_mapping', 'publish_result');
  }
};
