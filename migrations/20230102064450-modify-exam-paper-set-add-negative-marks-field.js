'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'paper_set', // table name
      'negative_marks_per_question', // new field name
      {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'paper_set',
      'negative_marks_per_question'
    );
  }
};
