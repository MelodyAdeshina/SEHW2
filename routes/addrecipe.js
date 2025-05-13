const express = require('express');
const router = express.Router();
const connection = require('../Database/connection');

// GET /addrecipe - render the Add Recipe form
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

      res.render('addRecipe', { proteinTypes, ingredients });
    });
  });
});

// POST /addrecipe - handle form submission
router.post('/', (req, res) => {
  const { name, protein_type, ingredient_ids, new_ingredient, instructions } = req.body;

  // Handle the ingredient IDs (can be single or array)
  let selectedIngredients = [];
  if (Array.isArray(ingredient_ids)) {
    selectedIngredients = ingredient_ids.map(id => parseInt(id));
  } else if (ingredient_ids) {
    selectedIngredients = [parseInt(ingredient_ids)];
  }

  // Insert new ingredient if provided
  const insertNewIngredient = new Promise((resolve, reject) => {
    if (new_ingredient && new_ingredient.trim() !== '') {
      const insertQuery = 'INSERT INTO ingredients (name) VALUES (?)';
      connection.query(insertQuery, [new_ingredient.trim()], (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId); // ID of the new ingredient
      });
    } else {
      resolve(null); // No new ingredient provided
    }
  });

  insertNewIngredient
    .then(newIngredientId => {
      if (newIngredientId) {
        selectedIngredients.push(newIngredientId);
      }

      // Insert the recipe
      const insertRecipeQuery = 'INSERT INTO recipes (name, protein_type, instructions) VALUES (?, ?, ?)';
      connection.query(insertRecipeQuery, [name, protein_type, instructions], (err, result) => {
        if (err) {
          console.error('Error inserting recipe:', err);
          return res.status(500).send('Failed to insert recipe.');
        }

        const recipeId = result.insertId;

        // Insert into recipe_ingredients junction table
        const insertRIQuery = 'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES ?';
        const values = selectedIngredients.map(ingId => [recipeId, ingId]);

        if (values.length === 0) {
          return res.redirect('/recipes'); // No ingredients to insert
        }

        connection.query(insertRIQuery, [values], (err) => {
          if (err) {
            console.error('Error linking ingredients:', err);
            return res.status(500).send('Failed to link ingredients.');
          }

          res.redirect('/recipes');
        });
      });
    })
    .catch(err => {
      console.error('Error handling new ingredient:', err);
      res.status(500).send('Server error');
    });
});

module.exports = router;


