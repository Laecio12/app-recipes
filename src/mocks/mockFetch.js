const foods = require('./foodDetails');
const drinks = require('./drinks');

const mockFetch = (url) => {
  if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
    console.log('chamou');
    return Promise.resolve({
      json: () => Promise.resolve(foods),
    });
  }

  if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
    return Promise.resolve({
      json: () => Promise.resolve(drinks),
    });
  }

  return Promise.reject(Error('url not found'));
};

module.exports = mockFetch;
