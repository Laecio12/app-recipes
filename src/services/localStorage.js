export const setMealsToken = (token) => {
  localStorage.setItem('mealsToken', token);
};

export const setCocktailsToken = (token) => {
  localStorage.setItem('cocktailsToken', token);
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};
