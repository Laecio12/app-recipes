import { useEffect, useState } from 'react';

const useFavorite = (recipe) => {
  const [favorite, setFavorite] = useState({});

  useEffect(() => {
    if (recipe) {
      setFavorite({ id: recipe[0].idDrink || recipe[0].idMeal,
        type: Object.keys(recipe)[0],
        nationality: '',
        category: recipe[0].strCategory,
        alcoholicOrNot: '' || recipe[0].strAlcoholic,
        name: recipe[0].strMeal || recipe[0].strDrink,
        image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,

      });
    }
  }, [recipe]);

  return favorite;
};

export default useFavorite;
