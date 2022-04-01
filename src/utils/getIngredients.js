const getIngredients = (recipe, setIngredients) => {
  const ingredientsData = [];
  Object.keys(recipe).forEach((key) => {
    if (key.includes('strIngredient')
  && String(recipe[key]).length > 0 && recipe[key] !== null) {
      ingredientsData.push(recipe[key]);
    }
  });
  return setIngredients(ingredientsData);
};

export default getIngredients;
