const getIngredients = (array) => {
  const ingredients = [];
  Object.keys(array).forEach((key) => {
    if (key.includes('strIngredient')
      && String(array[key]).length > 0 && array[key] !== null) {
      ingredients.push(array[key]);
    }
  });
  return ingredients;
};

export default getIngredients;
