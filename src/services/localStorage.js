export const setMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

export const setCocktailsToken = (token) => {
  localStorage.setItem('cocktailsToken', token);
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getInProgressRecipes = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
};

export const setInProgressRecipes = (recipe, type) => {
  // recipe === { id: [lista]}
  // Criando a chave se ainda não houver.
  const saveIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (type === 'meals') {
    const newList = { ...saveIngredients,
      meals: { ...saveIngredients.meals, ...recipe } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
  } else {
    const newList = { ...saveIngredients,
      cocktails: { ...saveIngredients.cocktails, ...recipe } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newList));
  }
};
