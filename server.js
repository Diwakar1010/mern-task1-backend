const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv').config();


// MongoDB Connection
 mongoose.connect("mongodb://localhost:27017/")
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((err) => {
  console.error('Error connecting to MongoDB: ', err);
});








// Import routes
const vocabularyRoutes = require('./routes/vocabulary');

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// console.log("23::",vocabularyRoutes)
// Use vocabulary routes
app.use('/api/vocabulary', vocabularyRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
