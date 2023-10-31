// routes/markdownRoutes.js
const express = require('express');
const router = express.Router();
const markdownController = require('../controllers/markdownController');

// Create a new Markdown entry
router.post('/', markdownController.createMarkdown);

router.get('/:id', markdownController.getMarkdownById);

//  Update Markdown entries
 router.put('/:id', markdownController.updateMarkdown);

// Delete a Markdown entry by ID
router.delete('/:id', markdownController.deleteMarkdown);

router.get('/', markdownController.getMarkdown);

module.exports = router;
