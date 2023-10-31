// controllers/markdownController.js
const Markdown = require('../models/markdown');

// Create a new Markdown entry
const createMarkdown = async (req, res) => {
  try {
    console.log('Received data:', req.body); 
    const markdown = new Markdown({
      content: req.body.content,
    });
    await markdown.save();
    res.json(markdown);
  } catch (err) {
    res.status(500).json({ error: 'Could not create Markdown entry.' });
    console.error('Response Status:', error.response.status);
    console.error('Response Status Text:', error.response.statusText);
  }
};

const getMarkdown = async (req, res) => {
  try {
    const markdownData = await Markdown.find();
    console.log('Markdown Data:', markdownData);
    res.json(markdownData);
  } catch (error) {
    console.error('Failed to fetch Markdown data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMarkdownById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL parameter
    const markdownData = await Markdown.findById(id);
    console.log('Markdown Data:', markdownData);
    res.json(markdownData);
  } catch (error) {
    console.error('Failed to fetch Markdown data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a Markdown 
const updateMarkdown = async (req, res) => {
  const { id } = req.params; // Extract id from URL parameter
  const { content } = req.body;

  try {
    const updatedMarkdown = await Markdown.findByIdAndUpdate(id, { content }, { new: true });
    console.log('updated Markdown Data:', updatedMarkdown);

    if (!updatedMarkdown) {
      console.log('not found updated Markdown Data:', updatedMarkdown);
      return res.status(404).json({ error: 'Markdown content not found' });
    }

    res.json(updatedMarkdown); // Modify this line to return the updated content
  } catch (error) {
    console.error('Failed to update Markdown:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a Markdown
const deleteMarkdown = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedMarkdown = await Markdown.findByIdAndRemove(id);

    if (!deletedMarkdown) {
      return res.status(404).json({ error: 'Markdown content not found' });
    }

    res.json(deletedMarkdown);
  } catch (error) {
    console.error('Failed to delete Markdown:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createMarkdown,
  getMarkdown,
  updateMarkdown,
  deleteMarkdown,
 getMarkdownById
};
