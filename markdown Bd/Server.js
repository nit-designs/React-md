const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const markdownRoutes = require('./route/markdownRoutes');
require('dotenv').config(); // Load environment variables


const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/markdown', markdownRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}}`);
});
