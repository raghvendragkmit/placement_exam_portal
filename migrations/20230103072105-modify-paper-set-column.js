'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'paper_set', // table name
      'marks_per_question', // new field name
      {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('paper_set', 'marks_per_question');
  }
};
