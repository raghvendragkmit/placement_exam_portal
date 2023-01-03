'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'exam_user_mapping', // table name
      'total_marks_obtained', // new field name
      {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'exam_user_mapping',
      'total_marks_obtained'
    );
  }
};
