const oneMeal = require('../../cypress/mocks/oneMeal');
const oneDrink = require('../../cypress/mocks/oneDrink');
const drinks = require('../../cypress/mocks/drinks');
const foods = require('../../cypress/mocks/meals');
const foodCategories = require('../../cypress/mocks/mealCategories');
const drinkCategories = require('../../cypress/mocks/drinkCategories');
const oneDrink15997 = require('../../cypress/mocks/oneDrinkId15997');
const filterByBeef = require('../../cypress/mocks/beefMeals');
const filterByChicken = require('../../cypress/mocks/chickenMeals');
const filterByBreakfast = require('../../cypress/mocks/breakfastMeals');
const filterByDesert = require('../../cypress/mocks/dessertMeals');
const filterByGoat = require('../../cypress/mocks/goatMeals');
const filterBySoup = require('../../cypress/mocks/soupMeals');

/* eslint-disable */
const mockFetch = (url) => {
  console.log(url);
  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
    return Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319') {
    return Promise.resolve({
      json: () => Promise.resolve(oneDrink),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(drinks),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(foods),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({
      json: () => Promise.resolve(foodCategories),
    });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
    return Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977') {
    return Promise.resolve({
      json: () => Promise.resolve(oneMeal),
    });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997') {
    return Promise.resolve({
      json: () => Promise.resolve(oneDrink15997),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') {
    return Promise.resolve({
      json: () => Promise.resolve(filterByBeef),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') {
    return Promise.resolve({
      json: () => Promise.resolve(filterByChicken),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') {
    return Promise.resolve({
      json: () => Promise.resolve(filterByBreakfast),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') {
    return Promise.resolve({
      json: () => Promise.resolve(filterByDesert),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') {
    return Promise.resolve({
      json: () => Promise.resolve(filterByGoat),
    });
  }
  if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') {
    return Promise.resolve({
      json: () => Promise.resolve(filterBySoup),
    });
  }
  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') {
    return Promise.resolve({
      json: () => Promise.resolve(foods),
    });
  }

  return Promise.reject(Error('url not found'));
};

module.exports = mockFetch;
