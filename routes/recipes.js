var express = require('express');
var router = express.Router();
var connection = require('../Database/connection');

// Fetch all recipes with their ingredients
router.get('/', function(req, res, next) {
  const query = `
    SELECT r.id, r.name, r.description, r.protein_type, i.id AS ingredient_id, i.name AS ingredient_name, i.hover_info
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    JOIN ingredients i ON ri.ingredient_id = i.id
  `;

  connection.query(query, function(err, results) {
    if (err) throw err;

    // Step 1: Flatten into recipe list
    const recipesMap = new Map();

    results.forEach(row => {
      if (!recipesMap.has(row.id)) {
        recipesMap.set(row.id, {
          id: row.id,
          name: row.name,
          description: row.description,
          protein_type: row.protein_type,
          ingredients: []
        });
      }

      recipesMap.get(row.id).ingredients.push({
        name: row.ingredient_name,
        hover_info: row.hover_info
      });
    });

    // Step 2: Group by protein_type
    const groupedRecipes = {};

    Array.from(recipesMap.values()).forEach(recipe => {
      const protein = recipe.protein_type || 'Other';
      if (!groupedRecipes[protein]) {
        groupedRecipes[protein] = [];
      }
      groupedRecipes[protein].push(recipe);
    });

    // Step 3: Render with grouped recipes
    res.render('recipes', { groupedRecipes });
  });
});

module.exports = router;



