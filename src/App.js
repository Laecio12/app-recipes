import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drink from './pages/Drink/index';
import DrinkDetails from './pages/DrinkDetails ';
import FoodDetails from './pages/FoodDetails';
import Login from './pages/Login';

import Food from './pages/Food';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import Profile from './pages/Profile';
import RecipesFavorites from './pages/RecipesFavorites';
import RecipesDone from './pages/RecipesDone';
import RecipesInProgress from './pages/RecipesInProgress';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreNationalities from './pages/ExploreNationalities';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        path="/foods/:id/in-progress"
        render={ (params) => <RecipesInProgress { ...params } /> }
      />
      <Route
        path="/drinks/:id/in-progress"
        render={ (params) => <RecipesInProgress { ...params } /> }
      />
      <Route path="/done-recipes" component={ RecipesDone } />
      <Route path="/foods/:id" render={ (params) => <FoodDetails { ...params } /> } />
      <Route path="/drinks/:id" render={ (params) => <DrinkDetails { ...params } /> } />
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinkIngredients } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodIngredients } />
      <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
      <Route path="/explore/foods" component={ ExploreFood } />
      <Route path="/explore/drinks" component={ ExploreDrink } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ RecipesFavorites } />
      <Route path="/explore" component={ Explore } />
      <Route path="/foods" component={ Food } />
      <Route exact path="/drinks" component={ Drink } />
    </Switch>
  );
}

export default App;
