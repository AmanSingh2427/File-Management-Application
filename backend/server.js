const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const sequelize = require('./config/db');
const someRoutes = require('./routes/someRoutes'); // Example routes
const signupRoutes = require('./routes/signupRoutes'); // Import the new signup route
const loginRoutes = require('./routes/loginRoutes'); // Import the login routes
const fileUploadRoutes = require('./routes/fileUploadRoutes'); // Import the file upload routes
const dataRoutes = require('./routes/dataRoutes');



const app = express();


app.use(cors());
app.use(express.json());

// Use your routes
app.use('/api/items', someRoutes);
app.use('/api', signupRoutes); // Adjusted the route to use '/api' as the base
app.use('/api/auth', loginRoutes); // Use '/api/auth' for login routes
app.use('/api/files', fileUploadRoutes); // Adjusted to include file upload routes
app.use('/api/files', dataRoutes); // Use the new route

const PORT = process.env.PORT || 8000;


// // Sync Sequelize models with the database
// sequelize.sync()
//   .then(() => {
//     console.log('Database synchronized');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.error('Error syncing database:', err);
//   });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });





