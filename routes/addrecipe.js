const express = require('express');
const router = express.Router();
const connection = require('../Database/connection');

// Handle form submission
router.post('/', (req, res) => {
  const { name, protein_type, ingredient_id, new_ingredient, instructions } = req.body;

  // Check if required fields are filled out
  if (!name || !protein_type || !instructions) {
    return res.status(400).send('All fields are required.');
  }

  // Insert the new recipe into the recipes table
  const insertRecipeQuery = 'INSERT INTO recipes (name, protein_type, instructions) VALUES (?, ?, ?)';
  connection.query(insertRecipeQuery, [name, protein_type, instructions], (err, result) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).send('Error inserting recipe');
    }

    const recipeId = result.insertId;  // Get the ID of the newly inserted recipe

    // If a new ingredient was provided, insert it into the ingredients table
    let ingredientId = ingredient_id;
    if (new_ingredient) {
      const insertIngredientQuery = 'INSERT INTO ingredients (name, hover_info) VALUES (?, ?)';
      connection.query(insertIngredientQuery, [new_ingredient, 'No info available'], (err, result) => {
        if (err) {
          console.error('Error inserting ingredient:', err);
          return res.status(500).send('Error inserting ingredient');
        }

        // Get the ID of the newly inserted ingredient
        ingredientId = result.insertId;

        // Link the new ingredient to the recipe
        linkIngredientToRecipe(recipeId, ingredientId);
      });
    } else if (ingredient_id) {
      // Link the selected ingredient to the recipe
      linkIngredientToRecipe(recipeId, ingredientId);
    }

    // Redirect to the recipe page after insertion
    res.redirect(`/recipes/${recipeId}`);
  });
});

// Function to link an ingredient to a recipe
function linkIngredientToRecipe(recipeId, ingredientId) {
  const insertRecipeIngredientQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)';
  connection.query(insertRecipeIngredientQuery, [recipeId, ingredientId], (err) => {
    if (err) {
      console.error('Error linking ingredient to recipe:', err);
    }
  });
}

module.exports = router;



