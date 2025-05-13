// Inside routes/addrecipe.js
const express = require('express');
const router = express.Router();
const connection = require('../Database/connection');

// GET request to render the add recipe form
router.get('/', (req, res) => {
  const proteinQuery = 'SELECT DISTINCT protein_type FROM recipes WHERE protein_type IS NOT NULL';
  const ingredientQuery = 'SELECT id, name FROM ingredients';

  connection.query(proteinQuery, (err, proteinResults) => {
    if (err) {
      console.error('Error fetching protein types:', err);
      return res.status(500).send('Server error');
    }

    connection.query(ingredientQuery, (err, ingredientResults) => {
      if (err) {
        console.error('Error fetching ingredients:', err);
        return res.status(500).send('Server error');
      }

      const proteinTypes = proteinResults.map(row => row.protein_type);
      const ingredients = ingredientResults;

      res.render('addrecipe', { proteinTypes, ingredients });
    });
  });
});

// POST request to handle form submission
router.post('/', (req, res) => {
  const { name, protein_type, ingredient_id, new_ingredient, instructions } = req.body;

  if (!name || !protein_type || !instructions) {
    return res.status(400).send('All fields are required.');
  }

  const insertRecipeQuery = 'INSERT INTO recipes (name, protein_type, instructions) VALUES (?, ?, ?)';
  connection.query(insertRecipeQuery, [name, protein_type, instructions], (err, result) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      return res.status(500).send('Error inserting recipe');
    }

    const recipeId = result.insertId;

    let ingredientId = ingredient_id;
    if (new_ingredient) {
      const insertIngredientQuery = 'INSERT INTO ingredients (name, hover_info) VALUES (?, ?)';
      connection.query(insertIngredientQuery, [new_ingredient, 'No info available'], (err, result) => {
        if (err) {
          console.error('Error inserting ingredient:', err);
          return res.status(500).send('Error inserting ingredient');
        }

        ingredientId = result.insertId;
        linkIngredientToRecipe(recipeId, ingredientId);
      });
    } else if (ingredient_id) {
      linkIngredientToRecipe(recipeId, ingredientId);
    }

    res.redirect(`/recipes/${recipeId}`);
  });
});

function linkIngredientToRecipe(recipeId, ingredientId) {
  const insertRecipeIngredientQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)';
  connection.query(insertRecipeIngredientQuery, [recipeId, ingredientId], (err) => {
    if (err) {
      console.error('Error linking ingredient to recipe:', err);
    }
  });
}

module.exports = router;





