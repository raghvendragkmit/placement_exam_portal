'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Exam, { through: models.ExamUserPaperSetMapping, foreignKey: 'userId' });

    }
  }
  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      field: 'last_name'
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
      field: 'email'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'password'
    },
    organization: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      field: 'organization'
    },
    contactNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      },
      field: 'contact_number'
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      },
      field: 'role'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      // defaultValue: Sequelize.NOW,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      // defaultValue: Sequelize.NOW,
      field: 'updated_at'
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: null,
      field: 'deleted_at'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    paranoid: true,
  });
  return User;
};