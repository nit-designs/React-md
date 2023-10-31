// models/markdown.js
const mongoose = require('mongoose');

 const markdownSchema = new mongoose.Schema({
  content: String,
});

module.exports = mongoose.model('Markdown', markdownSchema);
