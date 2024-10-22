const appId = '5b592b46'; 
const appKey = 'ec1d04f863b3ed52c2ed90460ec48198'; 

document.getElementById('search-button').addEventListener('click', function() {
  const query = document.getElementById('search-input').value;
  fetchRecipes(query);
});

async function fetchRecipes(query) {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
  const data = await response.json();
  displayRecipes(data.hits);
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById('recipe-container');
  recipeContainer.innerHTML = '';

  recipes.forEach(recipeObj => {
    const recipe = recipeObj.recipe;

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.label}">
      <h2>${recipe.label}</h2>
      <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
      <p><strong>Instructions:</strong> <a href="${recipe.url}" target="_blank">View Recipe</a></p>
    `;

    recipeContainer.appendChild(recipeCard);
  });
}
