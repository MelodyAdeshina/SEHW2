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

    const recipes = [];
    results.forEach(row => {
      let recipe = recipes.find(r => r.id === row.id);
      if (!recipe) {
        recipe = {
          id: row.id,
          name: row.name,
          description: row.description,
          protein_type: row.protein_type,
          ingredients: []
        };
        recipes.push(recipe);
      }
      recipe.ingredients.push({
        name: row.ingredient_name,
        hover_info: row.hover_info
      });
    });

    res.render('recipes', { recipes });
  });
});

module.exports = router;


