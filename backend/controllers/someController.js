const pool = require('../config/db');


const getItems = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM shashank_pathak.uploadusers');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getItems,
  };