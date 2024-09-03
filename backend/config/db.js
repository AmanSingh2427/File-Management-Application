// backend/config/db.js

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// pool.connect((err) => {
//   if (err) {
//     console.error('Failed to connect to PostgreSQL:', err);
//   } else {
//     console.log('Connected to PostgreSQL database');
//   }
// });

// module.exports = pool;



const { Sequelize } = require('sequelize');

// Replace these with your actual database credentials
const sequelize = new Sequelize('php_training', 'postgres', 'mawai123', {
  host: '192.168.1.6',
  dialect: 'postgres',
});

module.exports = sequelize;
