const oneMeal = require('../../cypress/mocks/oneMeal');
const oneDrink = require('../../cypress/mocks/oneDrink');
const drinks = require('../../cypress/mocks/drinks');
const foods = require('../../cypress/mocks/meals');

const mockFetch = (url) => {
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

  return Promise.reject(Error('url not found'));
};

module.exports = mockFetch;
