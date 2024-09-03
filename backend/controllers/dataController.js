const ExcelData = require('../models/ExcelData'); // Make sure the path is correct

const getUserData = async (req, res) => {
    try {
        const userId = req.headers['upload_users_id']; // Get user ID from request headers

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const data = await ExcelData.findAll({
            where: {
                upload_users_id: userId
            }
        });

        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserData,
};
