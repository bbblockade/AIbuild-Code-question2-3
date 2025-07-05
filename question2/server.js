// server.js

import express from 'express';         
import fs from 'fs';                  
import cors from 'cors';               
import { buildCategoryTree } from './buildTree.js';

const app = express();
const PORT = 8080;
console.log("Starting server...");
// Enable CORS so frontend (on another port) can access this server
app.use(cors());

// Define the GET /categories endpoint
app.get('/categories', (req, res) => {
  fs.readFile('./categories.json', 'utf8', (err, data) => {
    if (err) {
      // If reading file fails, return 500 Internal Server Error
      return res.status(500).json({ error: 'Cannot read file' });
    }

    try {
      const categories = JSON.parse(data);             // Convert string to object
      const tree = buildCategoryTree(categories);      // Build tree from flat array
      res.json(tree);                                  // Send tree as JSON response
    } catch (parseError) {
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
