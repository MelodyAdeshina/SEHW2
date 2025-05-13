// recipe.js
const express = require('express');
const router = express.Router();
const connection = require('../Database/connection');

// Define the route for getting a specific recipe by its ID
router.get('/:id', (req, res) => {
  const recipeId = req.params.id;  // Get the recipe ID from the URL

  const query = `
    SELECT 
      r.name, 
      r.description, 
      r.instructions, 
      i.name AS ingredient_name, 
      i.hover_info
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON i.id = ri.ingredient_id
    WHERE r.id = ?
  `;

  connection.query(query, [recipeId], (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send('Database error');
    }

    if (rows.length === 0) {
      return res.status(404).send('Recipe not found');
    }

    const recipe = {
      name: rows[0].name,
      description: rows[0].description,
      instructions: rows[0].instructions,
      ingredients: rows.map(row => ({
        name: row.ingredient_name,
        hover_info: row.hover_info
      }))
    };

    res.render('recipe', { recipe });
  });
});

// Export the router as a function
module.exports = router; // Ensure you are exporting the router here as a module
