export const setMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

export const setCocktailsToken = (token) => {
  localStorage.setItem('cocktailsToken', token);
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getInProgressRecipes = () => JSON
  .parse(localStorage.getItem(inProgressRecipes));

export const setInProgressRecipes = (recipe) => {
  // Criando a chave se ainda não houver.
  if (!JSON.parse(localStorage.getItem(inProgressRecipes))) {
    localStorage.setItem(inProgressRecipes, JSON.stringify([]));
  } else {
    const savesIngredients = getInProgressRecipes();
    localStorage.setItem(inProgressRecipes, JSON.stringify(...savesIngredients, recipe));
  }
};
