const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db'); // Path to your database configuration file

const UploadUsers = sequelize.define('uploadusers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  schema: 'shashank_pathak', // Specify your schema name
  tableName: 'uploadusers', // Specify your table name
  timestamps: false, // Disable automatic timestamp columns
});

// Hook to hash password before saving
UploadUsers.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });


  UploadUsers.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = UploadUsers;
