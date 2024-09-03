const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Path to your database configuration file

const ExcelData = sequelize.define('excel_data', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  contact_no: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  upload_users_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'uploadusers', // Table name in the database
      key: 'id',
    },
  },
}, {
  schema: 'shashank_pathak',
  tableName: 'excel_data',
  timestamps: false,
});

module.exports = ExcelData;
