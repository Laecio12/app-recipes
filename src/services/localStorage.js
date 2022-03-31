import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export const setMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

export const setCocktailsToken = (token) => {
  localStorage.setItem('cocktailsToken', token);
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getStorageData = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const findFavorite = favoriteRecipes.some((recipe) => recipe.id === id);
  const favoriteIcon = findFavorite ? blackHeartIcon : whiteHeartIcon;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const doneRecipe = doneRecipes.some((recipe) => recipe.id === id);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};
  let inProgress = false;
  if (inProgressRecipes) { inProgress = true; }

  return { favoriteIcon, doneRecipe, inProgress };
};

export const setFavoriteRecipes = (recipe) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, recipe]));
};

export const deleteFavoriteRecipe = (id) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
};
